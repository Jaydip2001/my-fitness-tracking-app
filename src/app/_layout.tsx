import "../global.css";
import { Slot } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
export default function Layout() {
  return (
   


    <ClerkProvider tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>

  );
}
