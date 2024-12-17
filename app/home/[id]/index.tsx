import { View, Text, Alert } from "react-native";
import React from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import HeaderOptions from "../../../components/HeaderOptions";
import globalStyles from "../../../styles/globalStyles";
import useDocument from "../../../firebase/hooks/useDocument";
import TrainingSession from "../../../types/TrainingSession";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import { Timestamp } from "firebase/firestore";
import { assertScreens } from "expo-router/build/fork/getStateFromPath-forks";

export default function _screen() {
  const { id } = useGlobalSearchParams();

  const {
    data: trainingSession,
    loading,
    upsert,
  } = useDocument<TrainingSession>(`trainingSessions`, id as string);

  if (loading || !trainingSession) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Training Session",
          headerRight: () => <HeaderOptions showEmail={false} />,
        }}
      />

      <Text>Data: {trainingSession.sessionDate.toLocaleString()}</Text>
      {trainingSession.exercises.map((exercise) => (
        <View key={exercise.name}>
          <Text>Exercise: {exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Repetitions: {exercise.repetitions}</Text>
        </View>
      ))}

      <StyledButton
        title="Random Update"
        onPress={async () => {
          try {
            await upsert({
              ...trainingSession,
              sessionDate: new Date(),
            });
          } catch (error: any) {
            Alert.alert("Update Book error", error.toString());
          }
        }}
      />
    </View>
  );
}
