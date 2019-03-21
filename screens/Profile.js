import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Icon } from 'react-native-elements';

class Profile extends Component {

    static navigationOptions =({navigation})=>({
        title:'Profile',
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

    render() {
        return(
            <View><Text>Profile Component</Text></View>
        );
    }
}

export default Profile;