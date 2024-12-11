import { View, Text, FlatList } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import globalStyles from "../../styles/globalStyles";
import StyledButton from "../../components/StyledButton";
import useCollection from "../../firebase/hooks/useCollection";
import TrainingSession from "../../types/TrainingSession";
import ViewTrainingSession from "../../components/ViewTrainingSession";
import HeaderOptions from "../../components/HeaderOptions";

export default function Home() {
  const { data, remove, refreshData, loading } =
    useCollection<TrainingSession>(`trainingSessions`);

  data.forEach((trainingSession) => {
    console.log(trainingSession);
  });

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderOptions showEmail={true} />,
        }}
      />
      <View>
        <Text style={globalStyles.title}>Bem Vindo!</Text>
        <StyledButton
          title="Registrar novo treino"
          onPress={() => router.push("/home/new/")}
          style={{ marginTop: 12 }}
        />
      </View>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Seus Treinos anteriores</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewTrainingSession
              trainingSession={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
        <StyledButton
          title="Sitemap"
          onPress={() => {
            router.push("_sitemap");
          }}
        />
      </View>
    </View>
  );
}
