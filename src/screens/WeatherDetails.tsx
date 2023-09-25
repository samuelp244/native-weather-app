import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";

type RootStackParamList = {
  WeatherDetails: { q: string };
};

type WeatherDetailsRouteProp = RouteProp<RootStackParamList, "WeatherDetails">;

interface WeatherDetailsProps {
  route: WeatherDetailsRouteProp;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ route }) => {
  const { q } = route.params;
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${q}&days=10`
      )
      .then((res) => {
        if (res.status === 200) {
          setWeatherData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>
          {weatherData?.location.name}, {weatherData?.location.country}
        </Text>
        <Text style={styles.temperature}>
          {weatherData?.current.feelslike_c}°C
        </Text>
        <Image
          source={{ uri: `https:${weatherData?.current.condition.icon}` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.condition}>
          {weatherData?.current.condition.text}
        </Text>
      </View>

      {/* Daily Forecast */}
      <View style={styles.dailyForecast}></View>

      {/* Hourly Forecast */}
      <View style={styles.hourlyForecast}></View>
    </ScrollView>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  condition: {
    fontSize: 18,
  },
  dailyForecast: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hourlyForecast: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
