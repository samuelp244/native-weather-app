import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WeatherDetails from "./src/screens/WeatherDetails";
import { SafeAreaView, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarPosition='bottom' tabBar={() => <></>}>
        <Tab.Screen
          name='WeatherDetails1'
          children={() => (
            <WeatherDetails
              route={{
                key: "1",
                name: "WeatherDetails",
                params: { q: "Bangalore" },
              }}
            />
          )}
        />
        <Tab.Screen
          name='WeatherDetails2'
          children={() => (
            <WeatherDetails
              route={{
                key: "1",
                name: "WeatherDetails",
                params: { q: "Paris" },
              }}
            />
          )}
        />
        <Tab.Screen
          name='WeatherDetails3'
          children={() => (
            <WeatherDetails
              route={{
                key: "1",
                name: "WeatherDetails",
                params: { q: "brooklyn" },
              }}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
// Bangalore
export default App;
