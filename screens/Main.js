
import React from 'react'
import { StyleSheet, Platform, Image, Text, View , Button} from "react-native";
import {f,auth, storage, db} from '../config/config';
import ActionButton from 'react-native-action-button';
import {createStackNavigator, createDrawerNavigator,DrawerItems, SafeAreaView, createAppContainer} from 'react-navigation';
import { Card, ListItem, Icon } from 'react-native-elements';
import Announcements from './Announcements';

export default class Main extends React.Component{
    state = {
        currentUser:null
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

    takeToAnnoucnements = () =>{
        this.props.navigation.navigate('Announcements')        
    }


    render(){
        const {currentUser} = this.state
        return(
            <View style={styles.container}>
                <Text>
                    Hurayyy {currentUser && currentUser.email}!!                    
                </Text>                
                <Button title="logout" onPress={this.signOutUser} /> 
                <Button title="Announcements" onPress={this.takeToAnnoucnements}/> 
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { 
                        this.props.navigation.navigate('Announcements')
                        // console.log("Hmm");
                        }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        height: 40,
        width:'90%',
        borderColor:'gray',
        borderWidth:1,
        marginTop:8
    }
})