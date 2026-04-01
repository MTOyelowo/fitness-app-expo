import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { Text, View } from "react-native";

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  withHeader?: boolean;
  header?: string;
  withSubtext?: boolean;
  subText?: string;
}

const LogoBranding: FC<Props> = ({
  icon,
  withHeader = true,
  header = "FitTracker",
  withSubtext = true,
  subText = "Track your fitness journey\nand reach your goals",
}) => {
  return (
    <View className="items-center mb-8">
      <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
        <Ionicons name={icon ? icon : "fitness"} size={40} color="white" />
      </View>
      {withHeader ? (
        <Text className="text-3xl font-bold text-gray-900 mb-2">{header}</Text>
      ) : null}
      {withSubtext ? (
        <Text className="text-lg text-gray-600 text-center">{subText}</Text>
      ) : null}
    </View>
  );
};

export default LogoBranding;
