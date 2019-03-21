import React from 'react'
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import {f,auth, storage, db} from '../config/config';

export default class Login extends React.Component{
    state = {
        email:'',
        password:'',
        errorMessage:null
    }

    handleLogin = () =>{        
        const {email, password} = this.state
        f.auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=> this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

render(){
    return(
        <View style={styles.container}>
            <Text>Login</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
            </Text>}
            <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={
                email => this.setState({email})
            }
            value = {this.state.email}
            />
            <TextInput
                secureTextEntry
                placeholder = "Password"
                autoCapitalize = "none"
                style={styles.textInput}
                onChangeText={
                    password => this.setState({password})
                }
                value = {this.state.password}   
            />
            <Button 
                title="Login"
                onPress = {this.handleLogin}
                />
        
            <Button 
                title="Don't have an account? Sign Up"
                onPress={() => this.props.navigation.navigate('SignUp')}
                />
            
        </View>
    )
}

}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        // alignItems:'center'
    },
    textInput:{
        height: 40,
        paddingLeft: 6
    }
})