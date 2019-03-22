import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class createNote extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Note'
    })

    render() {
        return(
            <View><Text>Create Note Component</Text></View>
        );
    }
}