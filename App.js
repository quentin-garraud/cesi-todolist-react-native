import * as React from 'react';
import { Text, View, Button } from 'react-native';
import TodoList from './components/TodoList';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ConfigurationScreen from './components/ConfigurationScreen'
import { createStackNavigator } from '@react-navigation/stack';
import DetailTodoComponent from './components/DetailTodoComponent';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator()

function Root(){
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Todolist" component={TodoList} />
      <Stack.Screen name="DetailsTodo" component={DetailTodoComponent} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ma todolist" component={Root} />
        <Tab.Screen name="Configuration" component={ConfigurationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
