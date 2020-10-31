import * as React from "react";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
// import { TabNavigator } from "react-navigation";
// You can import from local files
import History from "./components/History";
import { purple, white, gray, orange } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";

// import {
//   createDrawerNavigator,
//   createStackNavigator,
//   createBottomTabNavigator,
//   createAppContainer,
// } from "react-navigation";

const Tab = createMaterialTopTabNavigator();
function TabNaviagtor() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: white,
        inactiveTintColor: gray,
        style: { backgroundColor: purple },
        tabStyle: { height: 54 },
        indicatorStyle: { backgroundColor: orange },
      }}
    >
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Add Entry" component={AddEntry} />
    </Tab.Navigator>
  );
}

const UdaciStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default function App() {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <TabNaviagtor />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
