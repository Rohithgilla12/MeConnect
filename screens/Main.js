
import React from 'react'
import { StyleSheet, Platform, Image, Text, View , Button, FlatList} from "react-native";
import {f,auth, storage, db} from '../config/config';
import ActionButton from 'react-native-action-button';
import {createStackNavigator, createDrawerNavigator,DrawerItems, SafeAreaView, createAppContainer} from 'react-navigation';
import { Card, ListItem, Icon } from 'react-native-elements';
import Announcements from './Announcements';

export default class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentUser:null,
            photoFeed : [0,1,2,3,4],
            refresh: false
        }
    }

    loadNew = () => {
        this.setState({
            refresh: true
        });
        this.setState({
            photoFeed : [5,6,7,8,9],
            refresh: false
        })
    }

    static navigationOptions =({navigation})=>({
        title:'Home',
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

    componentDidMount(){
        const {currentUser} = f.auth()
        this.setState({ currentUser })
    }

    signOutUser =  () => {
        f.auth().signOut()
        .then(this.props.navigation.navigate('Login'))
        .catch("Can;t help ")
    }

    createPost= ()=>{
        this.props.navigation.navigate('Create')
    }



    render(){
        const {currentUser} = this.state
        return(
            <View style={styles.container}>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {this.loadNew}
                    data = {this.state.photoFeed}
                    keyExtractor = {(item, index) => index.toString()}
                    style = {{ flex:1, backgroundColor:"#eee"}}
                    renderItem = {({item, index}) => (
                        <View key= {index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between', borderColor:'grey', borderBottomWidth:1 }}>
                            <View style = {{padding:5, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>Gilla</Text>
                                <Text>Time Ago</Text>                                
                            </View>
                            <View>
                                <Image
                                    source = {{uri: 'https://source.unsplash.com/random/500x'+ Math.floor(Math.random() * 800+ 500).toString() }}
                                    style = {{resizeMode: 'cover', width:'100%', height: 275}}
                                />
                            </View>
                            <View>
                                <Text>Caption of the Image goes here!</Text>
                            </View>
                            <View style={{flex:0.1}}/>
                        </View>
                    )}
                    />

                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { 
                        this.props.navigation.navigate('createPost')                        
                        }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    textInput:{
        height: 40,
        width:'90%',
        borderColor:'gray',
        borderWidth:1,
        marginTop:8
    }
})