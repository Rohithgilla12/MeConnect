import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class createTodo extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Todo'
    })

    render() {
        return(
            <View><Text>Create Note Component</Text></View>
        );
    }
}