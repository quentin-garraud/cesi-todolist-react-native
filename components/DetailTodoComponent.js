import React from 'react';
import { View, Text, Button } from 'react-native';
import { getOneTodoById } from '../src/api';
import styles from '../assets/Styles';

export default class DetailTodoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: props.route.params.id, todo: '' };
    this._oneTodoById();
    console.log(props);
  }

  _oneTodoById() {
    getOneTodoById(this.state.id).then((response) => {
      console.log(response);
      this.setState({ todo: response });
    });
  }

  render() {
    const { id, todo } = this.state;
    let status;
    if (this.state.todo.completed === true) {
      status = (
        <Text style={{ color: 'green' }}>Complété</Text>
      );
    } else {
      status = (
        <Text style={{ color: 'red' }}>Non Complété</Text>
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.userid}>
          Ecrit par l'utilisateur n° {todo.userId}
        </Text>
        {status}
      </View>
    );
  }
}
