import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { updateTodo, deleteTodo } from '../src/api';
import QuickTodo from './QuickTodo';
import styles from '../assets/Styles';
import { createStackNavigator } from '@react-navigation/stack';
import DetailTodoComponent from './DetailTodoComponent';
import { NavigationContainer } from '@react-navigation/native';



export default class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _updateTodo() {
    updateTodo(this.props.todo.id, !this.props.todo.completed).then(
      (response) => {
        console.log(response);
      }
    );
  }

  _deleteTodo() {
    deleteTodo(this.props.todo.id).then((response) => {
      console.log(response);
    });
  }

  render() {
    let status;
    let button;
    if (this.props.todo.completed === true) {
      status = 'Complété';
      button = (
        <Button
          disabled
          style={styles.button}
          buttonStyle={{ borderRadius: 10 }}
          icon={{
            name: 'check-circle',
            size: 15,
            color: 'black',
          }}
          title="Complété !"
        />
      );
    } else {
      status = 'Non Complété';
      button = (
        <Button
          icon={{
            name: 'check',
            size: 15,
            color: 'white',
          }}
          buttonStyle={{ borderRadius: 10 }}
          style={styles.button}
          title="Valider"
          onPress={() => this._updateTodo()}
        />
      );
    }

    return (

      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsTodo', {id: this.props.todo.id})}>
          <Card pointerEvents="none">
            <Text style={styles.title}>{this.props.todo.title}</Text>
            <Text style={styles.userid}>
              Tâche n°{this.props.todo.id} | Utilisateur n°
              {this.props.todo.userId}
            </Text>
            <Text style={styles.status}>{status}</Text>
            <QuickTodo title={this.props.todo.title} />
            {button}
            <Button
              style={styles.button}
              onPress={() => this._deleteTodo()}
              title="Supprimer"
              icon={{
                name: 'remove-circle',
                size: 15,
                color: 'white',
              }}
              buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
            />
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
