import { StyleSheet } from "react-native";

const theme = {
  primaryColor: "#478ECC",
  defaultRadius: 8,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  input: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderColor: "#478ECC",
    borderRadius: theme.defaultRadius,
    width: "100%",
    marginTop: 12,
  },
  summary: {
    marginTop: 20,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "semibold",
    marginTop: 10,
  },
  button: {
    height: 32,
    padding: 4,
    backgroundColor: "#478ECC",
    borderRadius: theme.defaultRadius,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default globalStyles;
