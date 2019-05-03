import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native'
import {
  f,
  auth,
  storage,
  db
} from '../config/config';
import ActionButton from 'react-native-action-button';
import {
  Card,
  ListItem,
  Icon
} from 'react-native-elements';


export default class eee extends React.Component {
    static navigationOptions =({navigation})=>({
      title:'EEE',
      headerStyle: {
          backgroundColor: "#355876"
      },
      headerTintColor: '#fff',
      headerLeft : <Icon 
                          name='menu' 
                          size={30}
                          color='white'
                          onPress={()=>navigation.toggleDrawer()}
                  />
  })
  render() {
    return (
            <View style={styles.container}>
            <Text>EEE Route</Text> 
            <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { 
                this.props.navigation.navigate('createDocument')
            }}
                />
            </View>
            )
        }
        }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40
  }
})