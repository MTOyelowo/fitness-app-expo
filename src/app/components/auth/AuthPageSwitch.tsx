import { Link } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  href: string;
  mainText: string;
  switchText: string;
}

const AuthPageSwitch: FC<Props> = ({ href, mainText, switchText }) => {
  return (
    <View className="flex-row justify-center items-center my-4 gap-1">
      <Text className="text-gray-600">{mainText}</Text>
      <Link href={href} asChild>
        <TouchableOpacity>
          <Text className="text-blue-600 font-semibold">{switchText}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default AuthPageSwitch;
