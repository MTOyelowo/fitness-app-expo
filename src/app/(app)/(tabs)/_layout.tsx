import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "react-native";

function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          headerShown: false,
          title: "Exercises",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          headerShown: false,
          title: "Workout",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="plus-circle" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="active-workout"
        options={{
          title: "Active Workout",
          headerShown: false,
          href: null,
          tabBarStyle: {
            display: "none",
          },
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="clock-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          //   tabBarIcon: () => (
          //     <Image
          //       source={user?.imageUrl ?? user?.externalAccounts[0]?.imageUrl}
          //       className="rounded-full"
          //       style={{ width: 20, height: 20, borderRadius: 100 }}
          //     />
          //   ),
        }}
      />
    </Tabs>
  );
}

export default Layout;
