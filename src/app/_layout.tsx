import "../global.css";
import { ClerkProvider } from "@clerk/expo";
import { Slot, Stack, Tabs } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function Layout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Slot />
    </ClerkProvider>
  );
}
