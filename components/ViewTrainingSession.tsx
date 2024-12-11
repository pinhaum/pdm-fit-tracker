import { View, Text, Alert } from "react-native";
import React from "react";
import StyledButton from "./StyledButton";
import TrainingSession from "../types/TrainingSession";
import { useRouter } from "expo-router";

interface ViewTrainingSessionProps {
  trainingSession: TrainingSession;
  onDelete: Function;
}

export default function ViewTrainingSession({
  trainingSession,
  onDelete,
}: ViewTrainingSessionProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: "darkblue", borderTopWidth: 1, marginTop: 12 }}
    >
      <Text>Data: {trainingSession.sessionDate.toString()}</Text>
      {trainingSession.exercises.map((exercise) => (
        <View key={exercise.name}>
          <Text>Exercise: {exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Repetitions: {exercise.repetitions}</Text>
        </View>
      ))}
      <Text>Notes: {trainingSession.notes}</Text>

      <View style={{ flexDirection: "row" }}>
        <StyledButton
          title="Ver detalhes da sessão"
          onPress={() => {
            if (trainingSession.id) {
              router.push(`/home/${trainingSession.id}/`);
            } else {
              Alert.alert(
                "View error",
                "cannot access training session details because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%" }}
        />

        <StyledButton
          title="Delete"
          onPress={() => {
            if (trainingSession.id) {
              Alert.alert("Delete Training Session?", "Are you sure?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "delete error",
                "cannot delete training session because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%", backgroundColor: "darkred" }}
        />
      </View>
    </View>
  );
}
