import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class sem1 extends Component {
    static navigationOptions =({navigation})=>({
        title:'Sem 1',
        headerTintColor: '#129cf3',
        headerTitleStyle: {
            color: "#129cf3"
        },
    })

    render() {
        return(
            <View style= {styles.container}>
                <Text>Semester</Text>
            </View>
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