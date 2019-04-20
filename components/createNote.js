import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class createNote extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Note'
    })

    render() {
        return(
            <View style= {styles.container}><Text>Create Note Component</Text></View>
        );
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