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
import convertTimestamp from "../../../helpers/convertTimestamp";

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
      <View style={{ margin: 12 }}>
        <Text>
          Data:{" "}
          {convertTimestamp(
            trainingSession.sessionDate as unknown as Timestamp
          )}
        </Text>
        <Text>Exercises:</Text>
        {trainingSession.exercises.map((exercise, index) => (
          <View
            key={index}
            style={{
              marginLeft: 12,
              marginBottom: 6,
              borderColor: "#478ECC",
              borderBottomWidth: 1,
            }}
          >
            <Text>
              Exercise {index + 1}: {exercise.name}
            </Text>
            <Text>Sets: {exercise.sets}</Text>
            <Text>Repetitions: {exercise.repetitions}</Text>
          </View>
        ))}
      </View>

      <StyledButton
        title="Random Update"
        onPress={async () => {
          try {
            await upsert({
              ...trainingSession,
              sessionDate: new Date(),
              // exercises: [
              //   ...trainingSession.exercises,
              //   {
              //     name: "New Exercise",
              //     sets: 0,
              //     repetitions: 0,
              //   },
              // ],
            });
          } catch (error: any) {
            Alert.alert("Update Book error", error.toString());
          }
        }}
      />
    </View>
  );
}
