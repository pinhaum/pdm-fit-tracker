import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../styles/globalStyles";
import TrainingSession from "../../types/TrainingSession";
import Exercise from "../../types/Exercise";
import StyledButton from "../../components/StyledButton";
import useAuth from "../../firebase/hooks/useAuth";
import useCollection from "../../firebase/hooks/useCollection";
import { router, Stack } from "expo-router";
import HeaderOptions from "../../components/HeaderOptions";

export default function _new() {
  const trainingSessionCollection =
    useCollection<TrainingSession>(`trainingSessions`);

  const [trainingSession, setTrainingSession] = useState<TrainingSession>({
    // userId: user?.uid,
    sessionDate: new Date(),
    exercises: [],
    notes: "",
  });

  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: 0,
    repetitions: 0,
  });

  const handleAddExercise = () => {
    setTrainingSession((prev) => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }));

    // Reset input
    setExercise({ name: "", sets: 0, repetitions: 0 });
  };

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "New Training Session",
          headerRight: () => <HeaderOptions />,
        }}
      />
      <Text style={globalStyles.title}>Preencha as informações</Text>
      <Text>Preencha as informações do seu treino</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Preencha o nome do exercício"
        value={exercise.name}
        onChangeText={(text) =>
          setExercise((prev) => ({ ...prev, name: text }))
        }
      />

      <Text style={globalStyles.label}>Preencha quantidade de séries</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Preencha a quantidade de séries"
        keyboardType="numeric"
        value={exercise.sets.toString()}
        onChangeText={(text) =>
          setExercise((prev) => ({ ...prev, sets: Number(text) }))
        }
      />

      <Text style={globalStyles.label}>
        Preencha a quantidade de repetições
      </Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Preencha a quantidade de repetições"
        keyboardType="numeric"
        value={exercise.repetitions.toString()}
        onChangeText={(text) =>
          setExercise((prev) => ({ ...prev, repetitions: Number(text) }))
        }
      />

      <StyledButton
        title="Adicionar Exercício"
        onPress={handleAddExercise}
        style={{ marginTop: 12, backgroundColor: "darkgreen" }}
      />

      <TextInput
        style={[globalStyles.input, { height: 80 }]}
        placeholder="Algo a adicionar sobre seu treino?"
        value={trainingSession.notes}
        onChangeText={(text) =>
          setTrainingSession((prev) => ({ ...prev, notes: text }))
        }
        multiline
      />

      <Text style={globalStyles.summary}>
        Exercises: {JSON.stringify(trainingSession.exercises, null, 2)}
      </Text>

      <StyledButton
        title="Finalizar"
        onPress={() => {
          // console.log(trainingSession);
          trainingSessionCollection.create(trainingSession);
          router.push("/home/");
        }}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
