import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../firebase/hooks/useAuth";
import HeaderOptions from "../components/HeaderOptions";

// Mock das dependências
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../firebase/hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.spyOn(Alert, "alert");

describe("HeaderOptions Component", () => {
  const mockLogout = jest.fn();
  const mockReplace = jest.fn();
  const mockUser = { email: "test@example.com" };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });

    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    jest.clearAllMocks();
  });

  it("should render the email of the user when showEmail is true", () => {
    render(<HeaderOptions showEmail />);

    expect(screen.getByText(mockUser.email)).toBeTruthy();
  });

  it("should not render the email of the user when showEmail is false", () => {
    render(<HeaderOptions showEmail={false} />);

    expect(screen.queryByText(mockUser.email)).toBeNull();
  });

  it("should call logout when the logout button is pressed", async () => {
    const { getByText } = render(<HeaderOptions />);
    const button = getByText("Logout");

    await fireEvent.press(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("should show an alert when logout fails", async () => {
    const errorMessage = "Erro ao deslogar";
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: jest.fn().mockRejectedValue(new Error(errorMessage)),
    });

    const { getByText } = render(<HeaderOptions />);
    const button = getByText("Logout");

    await fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Logout error",
      expect.stringContaining(errorMessage)
    );
  });
});
