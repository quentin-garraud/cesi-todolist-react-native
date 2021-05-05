import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Switch, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/Styles';
import ImagePicker from 'react-native-image-picker'

export default class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pseudo: '', darkMode: false, fontSize: '', photo: null, };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }

  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(this.state);
      await AsyncStorage.setItem('configuration', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  getData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('configuration');
      let value = JSON.parse(jsonValue);
      this.setState({
        pseudo: value.pseudo,
        fontSize: value.fontSize,
        darkMode: value.darkMode,
      });
    } catch (e) {
      console.log(e);
    }
  };

  _updatePseudo = (pseudo) => {
    this.setState({ pseudo });
  };
  _updateFontSize = (fontSize) => {
    this.setState({ fontSize });
  };
  _updateDarkMode = (darkMode) => {
    this.setState({ darkMode });
  };

  render() {
    let { pseudo, fontSize, darkMode, photo } = this.state;
    return (
      <View style={darkMode ? styles.darkTheme : styles.lightTheme}>
        <Text
          style={[
            styles.title,
            darkMode ? styles.darkThemeText : styles.lightThemeText,
          ]}>
          Configuration
        </Text>
        <View>
          <Text style={darkMode ? styles.darkThemeText : styles.lightThemeText}>
            Dark Mode
          </Text>
          <Switch onValueChange={this._updateDarkMode} value={darkMode} />
        </View>
        <View>
          <Text style={darkMode ? styles.darkThemeText : styles.lightThemeText}>
            Taille de la police
          </Text>
          <Input
            style={darkMode ? styles.darkThemeText : styles.lightThemeText}
            placeholder="Choisir la taille de la police"
            onChangeText={this._updateFontSize}
            value={fontSize}
          />
        </View>
        <View>
          <Text style={darkMode ? styles.darkThemeText : styles.lightThemeText}>
            Pseudo
          </Text>
          <Input
            style={darkMode ? styles.darkThemeText : styles.lightThemeText}
            placeholder="Votre pseudo"
            onChangeText={this._updatePseudo}
            value={pseudo}
          />
        </View>
        <Button title="Sauvegarder" onPress={() => this.storeData()} />
        <Image source={require("../assets/snack-icon.png")} />
      </View>
    );
  }
}
