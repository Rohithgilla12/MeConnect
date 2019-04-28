import React from 'react'
import { View, Text, StyleSheet,ActivityIndicator, FlatList } from 'react-native'
import {f,auth, storage, db} from '../config/config';
import ActionButton from 'react-native-action-button';
import { Card, ListItem, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class Announcements extends React.Component {
    constructor() {
        super();
        this.ref = db.collection('Todo');
        this.unsubscribe = null;
        this.state = {
            textInput: '',
            loading: true,
            announcements: [],
        };
    }

    static navigationOptions =({navigation})=>({
      title:'Todo',
      headerStyle: {
          backgroundColor: "#355876"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"
      },
      headerLeft : <Icon 
                          name='menu' 
                          size={30}
                          color='white'
                          onPress={()=>navigation.toggleDrawer()}
                  />
  })

    // componentDidMount() {
    //     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    // }
    
    // componentWillUnmount() {
    //     this.unsubscribe();
    // }

    onCollectionUpdate = (querySnapshot) => {
        const announcements = [];
        querySnapshot.forEach((doc) => {            
          const { description, user } = doc.data();
          announcements.push({
            key: doc.id,
            doc, // DocumentSnapshot
            description,
            user,
          });
        });
        this.setState({ 
        announcements,
          loading: false,
       });
       console.log(this.state.announcements)
      }
      static propTypes = {
        items: PropTypes.array.isRequired
    };
  render() {
    return (
            <View style={styles.container}>
            <Text>Todo Route</Text> 
            {/* <FlatList
                data={this.state.announcements}
                renderItem={
                  ({item}) => 
                  <Card
                  cardElevation={2}
                  cardMaxElevation={2}
                  cornerRadius={5}
                  >
                    <Text>{item.description}</Text>
                    <Text>{item.user}</Text>
                  </Card>
                  }
            /> */}
            
            <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { 
                this.props.navigation.navigate('createTodo')
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
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
},
itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
}
})