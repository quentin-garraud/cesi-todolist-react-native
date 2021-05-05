import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { getTodosFromApi } from '../src/api';
import TodoComponent from './TodoComponent';
import { Divider } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import AddTodoComponent from './AddTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/Styles';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.getTodos();
    this.state = { todos: [], search: '', pseudo: '', darkMode: false };
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }
  getTodos() {
    getTodosFromApi().then((response) => {
      this.setState({ todos: response });
    });
  }

  templateTodo = ({ item }) => <TodoComponent todo={item} />;

  updateSearch = (search) => {
    this.setState({ search });
  };

  getData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('configuration');
      let value = JSON.parse(jsonValue);
      this.setState({ pseudo: value.pseudo, darkMode: value.darkMode, });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { search, pseudo, darkMode } = this.state;

    return (
      <View style={darkMode ? styles.darkTheme : styles.lightTheme}>
        <SearchBar
          placeholder="Rechercher une tâche"
          onChangeText={this.updateSearch}
          value={search}
        />
        <Text style={[styles.title, darkMode ? styles.darkThemeText : styles.lightThemeText]}>Bonjour {pseudo} !</Text>
        <AddTodoComponent />
        <Text style={[styles.title, darkMode ? styles.darkThemeText : styles.lightThemeText]}>Liste des todos en cours</Text>
        <FlatList
          data={this.state.todos
            .filter((todo) => todo.completed === false)
            .filter((todo) => todo.title.includes(this.state.search))}
          renderItem={this.templateTodo}
        />
        <Divider style={styles.divider} />
        <Text style={[styles.title, darkMode ? styles.darkThemeText : styles.lightThemeText]}>Liste des todos terminés</Text>
        <FlatList
          data={this.state.todos
            .filter((todo) => todo.completed === true)
            .filter((todo) => todo.title.includes(this.state.search))}
          renderItem={this.templateTodo}
        />
      </View>
    );
  }
}
