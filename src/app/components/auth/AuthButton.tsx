// components/AuthButton.tsx
import { TouchableOpacity, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  loadingTitle: string;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "secondary";
}

const AuthButton: FC<Props> = ({
  title,
  onPress,
  loading = false,
  loadingTitle,
  disabled = false,
  icon,
  variant = "primary",
}) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl py-4 shadow-sm mb-4 ${
        disabled || loading
          ? "bg-gray-400"
          : isPrimary
            ? "bg-blue-600"
            : "bg-green-600 border border-gray-300"
      }`}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <Ionicons name="refresh" size={20} color="white" />
        ) : icon ? (
          <Ionicons name={icon} size={20} color="white" />
        ) : null}
        <Text className="font-semibold text-lg ml-2 text-white">
          {loading ? loadingTitle : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AuthButton;
