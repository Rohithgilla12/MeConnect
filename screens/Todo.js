import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Icon } from 'react-native-elements';

class Todo extends Component {

    static navigationOptions =({navigation})=>({
        title:'TODO',
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
            <View><Text>TODO Component</Text></View>
        );
    }
}

export default Todo;