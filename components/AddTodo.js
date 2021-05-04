import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Input, Button } from 'react-native-elements';
import { createTodo } from '../src/api';

export default class AddTodoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      userId: 1,
      completed: false,
      isFormSimple: true,
    };
  }

  _updateTitle = (title) => {
    this.setState({ title });
  };
  _updateUserId = (userId) => {
    this.setState({ userId });
  };
  _updateCompleted() {
    this.setState({ completed: !this.state.completed });
  }

  _createTodo() {
    createTodo(this.state.title, this.state.completed, this.state.useId).then(
      (response) => {
        console.log(response);
      }
    );
  }

  _updateForm = (isFormSimple) => {
    this.setState({ isFormSimple: !this.state.isFormSimple });
  };

  render() {
    const { title, userId, completed } = this.state;
    let buttonForm;
    let inputForm;

    if (this.state.isFormSimple) {
      buttonForm = (
        <Button
          style={styles.button}
          title="Formulaire avancé"
          onPress={() => this._updateForm()}
          buttonStyle={{ borderRadius: 10 }}
        />
      );
    } else {
      buttonForm = (
        <Button
          style={styles.button}
          title="Formulaire rapide"
          onPress={() => this._updateForm()}
          buttonStyle={{ borderRadius: 10 }}
        />
      );
      inputForm = (
        <View>
          <Input
            onChangeText={this._updateUserId}
            placeholder="UserId"
            value={userId}
            numeric
            keyboardType={'numeric'}
          />
          <CheckBox
            title="Complété ?"
            checked={completed}
            onPress={() => this._updateCompleted()}
          />
        </View>
      );
    }

    return (
      <View>
        <Input
          onChangeText={this._updateTitle}
          placeholder="Titre de la tâche"
          value={title}
        />
        {inputForm}
        {buttonForm}
        <Button
          style={styles.button}
          title="Ajouter"
          onPress={() => this._createTodo()}
          buttonStyle={{ backgroundColor: "green", borderRadius: 10 }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
});
