import * as React from 'react';
import { Text, View, Button } from 'react-native';
import TodoList from './components/TodoList';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ConfigurationScreen from './components/ConfigurationScreen'

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ma todolist" component={TodoList} />
        <Tab.Screen name="Configuration" component={ConfigurationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
