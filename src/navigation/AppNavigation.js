import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import Signup from '../screens/Signup';
import SplashScreen from '../screens/Splash';
import Home from '../screens/Home';
import Payment from '../screens/Payment';
import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="CreatePost" component={CreatePost} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
