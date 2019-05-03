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


export default class Announcements extends React.Component {
    constructor() {
      super();
      this.unsubscribe = null;
      this.state = {
        textInput: '',
        loading: true,
        announcements: [],
      };
    }

    static navigationOptions = ({
      navigation
    }) => ({
      title: 'Announcements',
      headerStyle: {
        backgroundColor: "#355876"
      },
      headerTintColor: '#fff',
      headerLeft: < Icon
      name = 'menu'
      size = {
        30
      }
      color = 'white'
      onPress = {
        () => navigation.toggleDrawer()
      }
      />
    })
  render() {
    return (
            <View style={styles.container}>
            <Text>Announcements Route</Text> 
            <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { 
                this.props.navigation.navigate('createAnnouncement')
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