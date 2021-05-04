import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { getTodosFromApi } from '../src/api';
import TodoComponent from './TodoComponent';
import { Divider } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import AddTodoComponent from './AddTodo';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.getTodos();
    this.state = { todos: [], search: '' };
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

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Rechercher une tâche"
          onChangeText={this.updateSearch}
          value={search}
        />
        <AddTodoComponent />
        <Text style={styles.title}>Liste des todos en cours</Text>
        <FlatList
          data={this.state.todos
            .filter((todo) => todo.completed === false)
            .filter((todo) => todo.title.includes(this.state.search))}
          renderItem={this.templateTodo}
        />
        <Divider style={styles.divider} />
        <Text style={styles.title}>Liste des todos terminés</Text>
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
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  divider: {
    marginTop: 20,
    padding: 5,
  },
});
