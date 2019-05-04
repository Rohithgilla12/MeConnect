
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableHighlight
} from "react-native";
import {
    f,
    auth,
    storage,
    db
} from '../config/config';


export default class SignUp extends React.Component{
    constructor() {
        super();
        this.ref = db.collection('users');
    }
    state = {
        email:'',
        password:'',
        username:'',
        fullName:'',
        mobileNumber:'',
        errorMessage:null
    }

    handleSignUp = () =>{
        // TODO: Adding more details, username, mobileNumber
        console.log("In handling..")
        f.auth().createUserWithEmailAndPassword(
            this.state.email, this.state.password
        ).then((res)=>{
            f.database().ref('users/' + res.user.uid).set({
                email: this.state.email,
                username:this.state.username,
                fullName: this.state.fullName,
                mobileNumber:this.state.mobileNumber
            })
            console.log(res.user.uid.toString())
            console.log("Done and dusted")
        }
        ).catch(
            console.log("Error")
        )
    }

render(){
    return(
        <View style={styles.container}>
            <Text>Sign Up</Text>
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
            <TextInput                
                placeholder = "Username"
                autoCapitalize = "none"
                style={styles.textInput}
                onChangeText={
                    username => this.setState({username})
                }
                value = {this.state.username}   
            />
            <TextInput                
                placeholder = "mobileNumber"
                autoCapitalize = "none"
                style={styles.textInput}
                onChangeText={
                    mobileNumber => this.setState({mobileNumber})
                }
                value = {this.state.mobileNumber}   
            />
            <TextInput                
                placeholder = "fullName"
                autoCapitalize = "none"
                style={styles.textInput}
                onChangeText={
                    fullName => this.setState({fullName})
                }
                value = {this.state.fullName}   
            />
            <Button 
                title="Sign Up"
                onPress = {this.handleSignUp}
                />
            
            <Button 
                title="Already have an account? Login "
                // onPress = {() => this.props.navigation.navigate('Login')}
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