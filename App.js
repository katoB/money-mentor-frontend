import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Quiz from './client/pages/Quiz'
import Link from './client/pages/Link'


export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator/>

      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      //   <Text>Shake your phone to open the developer menu.</Text>
      // </View>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  // Login: Login,
  // Signup: Signup,
  // Link: Link,
  Quiz: Quiz
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
