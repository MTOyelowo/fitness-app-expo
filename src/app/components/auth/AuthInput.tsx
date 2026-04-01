// components/AuthInput.tsx
import { View, TextInput, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "number-pad";
  maxLength?: number;
  editable?: boolean;
  criteria?: string;
  error?: string;
  className?: string;
}

const AuthInput: FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
  maxLength,
  editable = true,
  criteria,
  error,
  className,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>
      <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
        <Ionicons name={icon} size={20} color="#6B7280" />
        <TextInput
          className={`flex-1 ml-3 text-gray-900 ${className}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          maxLength={maxLength}
          autoCapitalize="none"
        />
      </View>
      {criteria && (
        <Text className="text-xs text-gray-500 mt-1">{criteria}</Text>
      )}
      {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default AuthInput;
