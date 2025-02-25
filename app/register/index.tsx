import { View, Text, TextInput } from "react-native";
import React from "react";
import StyledButton from "../../components/StyledButton";
import globalStyles from "../../styles/globalStyles";
import { router, Stack } from "expo-router";

export default function _screen() {
  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Register",
          // headerRight: () => <HeaderRight />,
        }}
      />
      <Text style={globalStyles.title}>Register your user</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        // value={email}
        // onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        // value={password}
        // onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton
        title="Sitemap"
        onPress={() => {
          router.push("_sitemap");
        }}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
