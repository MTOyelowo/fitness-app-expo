import { useAuth, useSignIn } from "@clerk/expo";
import { Href, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleSignIn from "../components/auth/GoogleSignIn";
import LogoBranding from "../components/LogoBranding";
import AuthDivider from "../components/auth/AuthDivider";
import AuthButton from "../components/auth/AuthButton";
import AuthFooter from "../components/auth/AuthFooter";
import AuthPageSwitch from "../components/auth/AuthPageSwitch";
import AuthInput from "../components/auth/AuthInput";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isLoaded } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // Extract fields from clerk
  const emailError = errors.fields?.identifier?.message || "";
  const passwordError = errors.fields?.password?.message || "";

  // Global / non-field errors (like "Invalid credentials", network issues, etc.)
  const globalError = errors.global?.[0]?.message || "";

  // Show global errors using Alert
  useEffect(() => {
    if (globalError) {
      Alert.alert("Sign In Failed", globalError, [{ text: "OK" }]);
    }
  }, [globalError]);

  const handleSubmit = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      Alert.alert("Please enter email and password!");
    }
    // Clear previous errors if needed (optional)
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      // Global errors will be caught by the useEffect above
      return;
    }

    // Handle successful flow
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log("Pending task:", session.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.push(url as any);
        },
      });
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code",
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    if (!code) {
      Alert.alert("Please enter code sent to your email!");
    }
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <LogoBranding
            icon="mail"
            header="Check Your Email"
            subText={`We've sent a verification code to\n${emailAddress}`}
          />

          <AuthInput
            label="Verification Code"
            icon="key-outline"
            value={code}
            onChangeText={setCode}
            placeholder="Enter 6-digit code"
            keyboardType="numeric"
            error={errors.fields?.code?.message || ""}
          />

          {/* Verify button */}
          <AuthButton
            title="Verify Email"
            loadingTitle="Verifying..."
            onPress={handleVerify}
            disabled={fetchStatus === "fetching"}
            icon="checkmark-circle-outline"
            loading={fetchStatus === "fetching"}
            variant="secondary"
          />

          <TouchableOpacity
            className="py-2"
            onPress={() => signIn.mfa.sendEmailCode()}
          >
            <Text className="text-blue-600 font-medium text-center">
              Didn't receive the code? Resend
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-2" onPress={() => signIn.reset()}>
            <Text className="text-blue-600 font-medium text-center">
              Start over
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          {/*Header Section*/}
          <View className="flex-1 justify-center">
            {/*logo/Branding*/}
            <LogoBranding />
          </View>

          {/* Sign in form*/}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Welcome Back
            </Text>
            {/* Email Input */}
            <AuthInput
              label="Email"
              icon="mail-outline"
              onChangeText={setEmailAddress}
              placeholder="Enter your email"
              value={emailAddress}
              editable={fetchStatus !== "fetching"}
              error={emailError}
              keyboardType="default"
              secureTextEntry={false}
            />

            {/* Password Input */}

            <AuthInput
              value={password}
              label="Password"
              icon="lock-closed-outline"
              onChangeText={setPassword}
              placeholder="Enter your password"
              editable={fetchStatus !== "fetching"}
              error={passwordError}
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>

          {/* Sign in button */}
          <AuthButton
            title="Sign In"
            loadingTitle="Signing in..."
            onPress={handleSubmit}
            disabled={fetchStatus === "fetching"}
            icon="log-in-outline"
            loading={fetchStatus === "fetching"}
            variant="primary"
          />

          {/* Divider */}
          <AuthDivider />

          {/* Google Sign In Button*/}
          <GoogleSignIn />

          {/* Sign up link*/}
          <AuthPageSwitch
            href="/sign-up"
            mainText="Don't have an account?"
            switchText="Sign up"
          />
        </View>

        {/* Google Sign In Button*/}
        <AuthFooter text=" Start your fitness journey today" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
