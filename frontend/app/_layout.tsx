//_layout.tsx
import { Stack } from "expo-router";
import { BrowserRouter } from "react-router-dom";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index"  options={{headerShown: false}}/>
        <Stack.Screen name="login"  options={{headerShown: false}}/>
        <Stack.Screen name="joinoptions" options={{headerShown: false}}/>
        <Stack.Screen name="skilloptionsguru" options={{headerShown: false}}/>
        <Stack.Screen name="skilloptionslearner" options={{headerShown: false}}/>
        <Stack.Screen name="contact" options={{headerShown: false}}/>
        <Stack.Screen name="home" options={{headerShown: false}}/>
        <Stack.Screen name="doubtSession" options={{headerShown: false}}/>
      </Stack>
  );
}