import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import {f,auth, storage, db} from '../config/config';


export default class Loading extends React.Component {
  componentDidMount() {
    f.auth().onAuthStateChanged(user => { 
      try {
        if (user.email){
          this.props.navigation.navigate('Main')
          console.log("Email")
        }
        else{
          this.props.navigation.navigate('Login')
        }
      } catch (error) {
        this.props.navigation.navigate('Login')
      }     
      
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})