import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { buttonName } from './QuickTodoRules';

export default class QuickTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let button = buttonName(this.props.title);
    return <View>{button}</View>;
  }
}
