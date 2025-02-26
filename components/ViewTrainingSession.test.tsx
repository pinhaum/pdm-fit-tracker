import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import ViewTrainingSession from "../components/ViewTrainingSession";
import TrainingSession from "../types/TrainingSession";

// Mock das dependências
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../helpers/convertTimestamp", () => jest.fn(() => "01/01/2024"));

jest.spyOn(Alert, "alert");

describe("ViewTrainingSession Component", () => {
  const mockOnDelete = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    jest.clearAllMocks();
  });

  const mockSession: TrainingSession = {
    id: "123",
    sessionDate: new Date(),
    exercises: [
      { name: "Squat", sets: 3, repetitions: 10 },
      { name: "Deadlift", sets: 4, repetitions: 8 },
    ],
    notes: "Treino intenso!",
  };

  it("should render the training session details", () => {
    render(
      <ViewTrainingSession
        trainingSession={mockSession}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("Data: 01/01/2024")).toBeTruthy();
    expect(screen.getByText("Exercise: Squat")).toBeTruthy();
    expect(screen.getByText("Sets: 3")).toBeTruthy();
    expect(screen.getByText("Repetitions: 10")).toBeTruthy();
    expect(screen.getByText("Exercise: Deadlift")).toBeTruthy();
    expect(screen.getByText("Sets: 4")).toBeTruthy();
    expect(screen.getByText("Repetitions: 8")).toBeTruthy();
    expect(screen.getByText("Notes: Treino intenso!")).toBeTruthy();
  });

  it("should navigate to the training session details page", async () => {
    const { getByText } = render(
      <ViewTrainingSession
        trainingSession={mockSession}
        onDelete={mockOnDelete}
      />
    );
    const button = getByText("Ver detalhes da sessão");

    await fireEvent.press(button);

    expect(mockPush).toHaveBeenCalledWith("/home/123/");
  });

  it("should show an alert if the training session does not have an id", async () => {
    const sessionWithoutId = { ...mockSession, id: undefined };
    const { getByText } = render(
      <ViewTrainingSession
        trainingSession={sessionWithoutId}
        onDelete={mockOnDelete}
      />
    );
    const button = getByText("Ver detalhes da sessão");

    await fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      "View error",
      "cannot access training session details because it does not have an id!"
    );
  });

  it("should show an alert to confirm training session deletion", async () => {
    const { getByText } = render(
      <ViewTrainingSession
        trainingSession={mockSession}
        onDelete={mockOnDelete}
      />
    );
    const button = getByText("Delete");

    await fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Delete Training Session?",
      "Are you sure?",
      expect.any(Array)
    );
  });

  it("should call onDelete if the user confirms the deletion", async () => {
    jest.spyOn(Alert, "alert").mockImplementation((_, __, buttons) => {
      // Simula a execução do onPress do botão "Yes"
      (buttons as any)[0].onPress();
    });

    const { getByText } = render(
      <ViewTrainingSession
        trainingSession={mockSession}
        onDelete={mockOnDelete}
      />
    );
    const button = getByText("Delete");

    await fireEvent.press(button);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
