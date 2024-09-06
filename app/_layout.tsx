import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{headerShown: false}}/>
      <Stack.Screen name="joinoptions" options={{headerShown: false}}/>
      <Stack.Screen name="skillsoptions" options={{headerShown: false}}/>
      <Stack.Screen name="signup" options={{headerShown: false}}/>
      <Stack.Screen name="contact" options={{headerShown: false}}/>
      <Stack.Screen name="home" options={{headerShown: false}}/>
    </Stack>
  );
}
