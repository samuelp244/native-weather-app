import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WeatherDetails from "./src/screens/WeatherDetails";
import { SafeAreaView } from "react-native";

const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
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
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
// Bangalore
export default App;
