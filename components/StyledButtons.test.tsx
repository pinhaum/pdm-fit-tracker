// StyledButton.test.js
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import StyledButton from "./StyledButton";

describe("StyledButton Component", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <StyledButton title="Test Button" onPress={() => {}} />
    );
    const button = getByText("Test Button");
    expect(button).toBeTruthy();
  });

  it("should call onPress when button is pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <StyledButton title="Clique aqui" onPress={mockOnPress} />
    );

    fireEvent.press(getByText("Clique aqui"));

    expect(mockOnPress).toHaveBeenCalled();
  });
});
