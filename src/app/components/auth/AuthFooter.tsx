import { FC } from "react";
import { Text, View } from "react-native";

interface Props {
  text: string;
}

const AuthFooter: FC<Props> = ({ text }) => {
  return (
    <View className="pb-6">
      <Text className="text-center text-gray-500 text-sm">{text}</Text>
    </View>
  );
};

export default AuthFooter;
