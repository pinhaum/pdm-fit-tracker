import { useRouter } from "expo-router";
import { Alert, Text } from "react-native";

import useAuth from "../firebase/hooks/useAuth";
import StyledButton from "./StyledButton";

type HeaderOptionsProps = {
  showEmail?: boolean;
};

export default function HeaderOptions({ showEmail }: HeaderOptionsProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      {showEmail ? <Text>{user?.email}</Text> : null}
      <StyledButton
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Logout error", error.toString());
          }
        }}
        title={"Logout"}
        style={{ width: "auto", marginLeft: 12 }}
      />
    </>
  );
}
