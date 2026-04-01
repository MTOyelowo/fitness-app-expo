import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoBranding from "../components/LogoBranding";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthPageSwitch from "../components/auth/AuthPageSwitch";
import AuthFooter from "../components/auth/AuthFooter";

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      Alert.alert("Please enter email and password!");
    }
    const { error } = await signUp.password({
      emailAddress,
      password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    if (!code) {
      Alert.alert("Please enter code sent to your email!");
    }
    await signUp.verifications.verifyEmailCode({
      code,
    });
    if (signUp.status === "complete") {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
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
      // Check why the sign-up is not complete
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 px-6 mb-6">
            <View className="flex-1 justify-center">
              {/*logo/Branding*/}
              <LogoBranding
                icon="mail"
                header="Check Your Email"
                subText={`We've sent a verification code to\n${emailAddress}`}
              />
              {/* Verification Form */}
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Enter Verification Code
                </Text>

                <AuthInput
                  icon="key-outline"
                  label=""
                  onChangeText={setCode}
                  placeholder="Enter 6-digit code"
                  value={code}
                  editable={fetchStatus !== "fetching"}
                  keyboardType="number-pad"
                  error={errors?.fields?.code?.message}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
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
                  onPress={() => signUp.verifications.sendEmailCode()}
                >
                  <Text className="text-blue-600 font-medium text-center">
                    Didn't receive the code? Resend
                  </Text>
                </TouchableOpacity>

                {/* ← NEW: Go back button */}
                <TouchableOpacity
                  className="py-3 mt-4"
                  onPress={() => {
                    signUp.reset(); // This is the key!
                    setCode("");
                  }}
                >
                  <Text className="text-gray-500 font-medium text-center">
                    ← Use a different email
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <AuthFooter text="Almost there! Just one more step" />
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
          {/* Main */}
          <View className="flex-1 justify-center">
            {/*logo/Branding*/}
            <LogoBranding header="Join FitTracker" />

            {/* Sign up form*/}
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Create Your Account
              </Text>
              {/* Email Input */}
              <AuthInput
                label="Email"
                icon="mail-outline"
                onChangeText={setEmailAddress}
                placeholder="Enter your email"
                value={emailAddress}
                editable={fetchStatus !== "fetching"}
                error=""
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
                error=""
                keyboardType="default"
                secureTextEntry={true}
                criteria="Must be at least 8 characters"
              />

              {/* Sign in button */}
              <AuthButton
                title="Create Account"
                loadingTitle="Creating Account..."
                onPress={handleSubmit}
                disabled={fetchStatus === "fetching"}
                icon="person-add-outline"
                loading={fetchStatus === "fetching"}
                variant="primary"
              />

              {/* Terms */}
              <Text className="text-center text-gray-500 text-xs mb-4">
                By signing up, you agree to our Terms of Service and Provacy
                Policy
              </Text>
            </View>

            <AuthPageSwitch
              href="/sign-in"
              mainText="Already have an account?"
              switchText="Sign In"
            />
          </View>
          {/* Footer */}
        </View>

        <AuthFooter text="Ready to transform your fitness?" />

        {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
        <View nativeID="clerk-captcha" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
