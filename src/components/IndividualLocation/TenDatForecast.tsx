// TenDayForecast.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getDayOfTheWeek } from "../../utils/common_functions";

interface TenDayForecastProps {
  day: string;
  weatherImageUri: string;
  lowTemp: number;
  highTemp: number;
}

const TenDayForecast: React.FC<TenDayForecastProps> = ({
  day,
  weatherImageUri,
  lowTemp,
  highTemp,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.day}>{getDayOfTheWeek(day)}</Text>
      <Image source={{ uri: weatherImageUri }} style={styles.weatherImage} />
      <Text style={styles.temperature}>
        {lowTemp.toFixed(0)}° - {highTemp.toFixed()}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "rgba(30, 150, 252, 0.8)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  day: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  weatherImage: {
    width: 40,
    height: 40,
  },
  temperature: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});

export default TenDayForecast;
