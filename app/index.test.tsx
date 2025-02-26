import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import useAuth from "../firebase/hooks/useAuth";
import _screen from "./index";
import Loading from "../components/Loading";
import { Alert } from "react-native";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../firebase/hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../components/Loading", () => "Loading");

describe("Login Screen", () => {
  const mockReplace = jest.fn();
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
      push: mockPush,
    });

    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
      loading: false,
    });

    jest.clearAllMocks();
  });

  it("renders the login screen correctly", () => {
    const { getByText, findByDisplayValue } = render(<_screen />);

    expect(getByText("Fit Tracker")).toBeTruthy();
    expect(getByText("Track your training sessions")).toBeTruthy();
    expect(findByDisplayValue("fulano@example.com")).toBeTruthy();
    expect(findByDisplayValue("1234567")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("renders the loading screen when loading is true", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
      loading: true,
    });

    render(<_screen />);

    expect(Loading).toBeTruthy();
  });

  it("redirects to /home/ if user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: "user@example.com" },
      login: mockLogin,
      loading: false,
    });

    render(<_screen />);

    expect(mockReplace).toHaveBeenCalledWith("/home/");
  });

  it("calls login function when pressing the login button", async () => {
    const { getByText } = render(<_screen />);

    fireEvent.press(getByText("Login"));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith("fulano@example.com", "1234567")
    );
  });

  it("shows an alert if login fails", async () => {
    mockLogin.mockRejectedValue(new Error("Login failed"));
    const alertSpy = jest.spyOn(Alert, "alert");

    const { getByText } = render(<_screen />);

    fireEvent.press(getByText("Login"));

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith(
        "Login error",
        "Ocorreu algo de errado ao realizar o login, cheque seu email e senha"
      )
    );

    alertSpy.mockRestore();
  });
});
