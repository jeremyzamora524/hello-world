import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let { username, bgColor } = this.props.route.params;

    this.props.navigation.setOptions({ title: username });

    return (
      <View style={[{ backgroundColor: bgColor }, styles.container]}>
        <Text>UI is still Missing. Code me please!</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 