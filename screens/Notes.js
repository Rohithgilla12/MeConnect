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
    database
} from '../config/config';
import ActionButton from 'react-native-action-button';
import {
    Card,
    ListItem,
    Icon
} from 'react-native-elements';

export default class Notes extends React.Component {
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
            title: 'Notes',
            headerStyle: {
                backgroundColor: "#355876"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            },
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

        fetchNotes = () => {
            try {
                var userId = f.auth().currentUser.uid;
            } catch {
                this.props.navigation.navigate('Login')
            }
            data = database.ref('users/' + userId + '/Notes/').once('value').then(function (snapshot) {
                console.log(snapshot);
            });
        }

        componentDidMount() {
            this.fetchNotes();
        }
      
  render() {
    return (
            <View style={styles.container}>
            <Text>Notes Route</Text> 
            <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { 
                this.props.navigation.navigate('createNote')
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