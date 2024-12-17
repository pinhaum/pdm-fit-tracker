import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import globalStyles from "../styles/globalStyles";

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("fulano@example.com");
  const [password, setPassword] = useState("1234567");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Fit Tracker</Text>
      <Text>Track your training sessions</Text>

      <TextInput
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            console.error(error.toString());
            Alert.alert(
              "Login error",
              "Ocorreu algo de errado ao realizar o login, cheque seu email e senha"
            );
          }
        }}
        style={{ marginTop: 12 }}
      />
      {/* <StyledButton
        title="Register"
        onPress={() => {
          router.push("/register/");
        }}
        style={{ marginTop: 12, backgroundColor: "green" }}
      /> */}
    </View>
  );
}
