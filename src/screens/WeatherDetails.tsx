import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { WeatherDataProps } from "../types/weatherApi.types";
import MiniHourlyForecastCard from "../components/IndividualLocation/MiniHourlyForecastCard";
import TenDayForecast from "../components/IndividualLocation/TenDatForecast";
import LottieView from "lottie-react-native";
import { isDaytimeFromLocalTime } from "../utils/common_functions";

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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${q}&days=10`
      )
      .then((res) => {
        if (res.status === 200) {
          setWeatherData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <LottieView
            source={
              isDaytimeFromLocalTime(weatherData?.location.localtime || "")
                ? require("../assets/lotties/daySky.json")
                : require("../assets/lotties/nightSky.json")
            }
            autoPlay
            loop
            style={[styles.lottieBackground, { transform: [{ scale: 1.5 }] }]}
          />
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.location}>{weatherData?.location.name}</Text>
              <Text style={styles.temperature}>
                {weatherData?.current.feelslike_c.toFixed(0)}°
              </Text>
              {/* <Image
          source={{ uri: `https:${weatherData?.current.condition.icon}` }}
          style={styles.weatherIcon}
        /> */}
              <Text style={styles.condition}>
                {weatherData?.current.condition.text}
              </Text>
              <Text style={styles.highAndLow}>
                H:
                {weatherData?.forecast.forecastday[0].day.maxtemp_c.toFixed(0)}°
                L:
                {weatherData?.forecast.forecastday[0].day.mintemp_c.toFixed(0)}°
              </Text>
            </View>

            {/* Daily Forecast */}
            <View style={styles.hourlyForecastContainer}>
              <ScrollView
                contentContainerStyle={styles.hourlyForecast}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {weatherData?.forecast.forecastday[0].hour.map(
                  (hourData, index) => (
                    <MiniHourlyForecastCard hourData={hourData} key={index} />
                  )
                )}
              </ScrollView>
            </View>

            {/* 10-day Forecast */}
            <View style={styles.tenDayForecastContainer}>
              <Text style={styles.forecastHeading}>10-DAY FORECAST</Text>
              {weatherData?.forecast.forecastday.map((forecastDay, index) => (
                <TenDayForecast
                  key={index}
                  day={forecastDay.date}
                  weatherImageUri={`https:${forecastDay.day.condition.icon}`}
                  lowTemp={forecastDay.day.mintemp_c}
                  highTemp={forecastDay.day.maxtemp_c}
                />
              ))}
            </View>
            {/* Hourly Forecast */}
            <View style={styles.dailyForecast}></View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#073B5F",
    paddingVertical:
      StatusBar.currentHeight !== undefined
        ? StatusBar.currentHeight + 70
        : StatusBar.currentHeight,
  },
  lottieBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  location: {
    fontSize: 30,
    fontWeight: "400",
    color: "#fff",
  },
  temperature: {
    fontSize: 96,
    fontWeight: "200",
    color: "#fff",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  condition: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  highAndLow: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  hourlyForecastContainer: {
    marginTop: 100,
    marginHorizontal: 20,
    overflow: "hidden",
    borderRadius: 20,
    backdropFilter: "blur(10px)",
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  hourlyForecast: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.8,
    overflow: "scroll", // Enable horizontal scrolling if needed
  },
  forecastHeading: {
    fontSize: 13,
    fontWeight: "400",
    color: "#fff",
    marginTop: 12,
    marginLeft: 6,
  },
  tenDayForecastContainer: {
    marginHorizontal: 20,
    overflow: "hidden",
    borderRadius: 20,
    backdropFilter: "blur(10px)",
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dailyForecast: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
