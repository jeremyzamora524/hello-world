import React from 'react';
import { View, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import BackgroundImage from '../img/Background.png';

const colorsCircle = {
  white: "white",
  blue: "#79c2d0",
  green: "#7dd87d",
  red: "#dc2f2f",
  yellow: "#ffc93c",
  purple: "#6643b5",
  pink: "#f76b8a",
}

export default class Start extends React.Component {

  colors = {
    white: "white",
    blue: "#79c2d0",
    green: "#7dd87d",
    red: "#dc2f2f",
    yellow: "#ffc93c",
    purple: "#6643b5",
    pink: "#f76b8a",
  }

  constructor(props) {
    super(props);
    this.state = { username: '', bgColor: this.colors.white };
  }

  changeColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>

          <View style={styles.titleBox}>
            <Text style={styles.title}>Give It a Chat</Text>
          </View>

          <View style={styles.userChoices}>

            <View style={styles.userBox}>

              <Text style={styles.title2}>Choose your name:</Text>

              <TextInput style={styles.title2}
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
                placeholder='(eg. Steve)'
              />

            </View>

            <Text style={styles.title3}>Choose a Background Color:</Text>

            <View style={styles.colorScheme}>

              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.white }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.white)}
              />

              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.blue }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.blue)}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.green }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.green)}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.red }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.red)}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.yellow }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.yellow)}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.purple }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.purple)}
              />
              <TouchableOpacity
                style={[{ backgroundColor: colorsCircle.pink }, styles.borderRadius]}
                onPress={() => this.changeColor(this.colors.pink)}
              />

            </View>

            <Pressable style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, bgColor: this.state.bgColor })}
            >

              <Text style={styles.buttonText}>Start Chatting</Text>

            </Pressable>


          </View>

        </ImageBackground >

      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    height: "75%",
    width: "88%",
    alignItems: "center",
    paddingTop: 200,
  },

  title: {
    fontWeight: '600',
    fontSize: 40,
    color: 'white',
  },

  userChoices: {
    backgroundColor: "white",
    height: "25%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  userBox: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  title2: {
    fontSize: 15,
  },

  title3: {
    fontSize: 15,
    paddingBottom: 15,
  },

  colorScheme: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    height: '33%',
  },

  borderRadius: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
  },

  button: {
    width: "88%",
    height: "28%",
    borderRadius: 8,
    backgroundColor: "#1D6085",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },

  buttonText: {
    color: 'white',
  }

});