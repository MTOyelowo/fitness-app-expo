// components/AuthDivider.tsx
import { View, Text } from "react-native";

const AuthDivider = () => (
  <View className="flex-row items-center my-4">
    <View className="flex-1 h-px bg-gray-200" />
    <Text className="px-4 text-gray-500 text-sm">or</Text>
    <View className="flex-1 h-px bg-gray-200" />
  </View>
);

export default AuthDivider;
