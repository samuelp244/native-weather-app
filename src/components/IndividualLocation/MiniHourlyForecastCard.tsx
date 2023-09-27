import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { individualHourForecastType } from "../../types/weatherApi.types";

const MiniHourlyForecastCard = ({
  hourData,
}: {
  hourData: individualHourForecastType;
}) => {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.time}>{hourData.time.slice(-5)}</Text>
      <Image
        source={{ uri: `https:${hourData.condition.icon}` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.temperature}>{hourData.temp_c.toFixed(0)}°</Text>
    </View>
  );
};

export default MiniHourlyForecastCard;

const styles = StyleSheet.create({
  miniCard: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#1E96FC",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  temperature: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  weatherIcon: {
    marginVertical: 7,
    width: 40,
    height: 40,
  },
});
