import React from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableHighlight
} from "react-native";
import {
    f,
    auth,
    storage,
    db
} from '../config/config';

export default class Login extends React.Component{
    state = {
        email:'',
        password:'',
        errorMessage:null
    }
    static navigationOptions = ({
        navigation
    }) => ({
        title: 'Login',
        headerStyle: {
            backgroundColor: "#73c3fb"
        },
        headerTintColor: '#73c3fb',
        headerTitleStyle: {
            color: "#000"
        },
    })
    handleLogin = () =>{        
        const {email, password} = this.state
        f.auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=> this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    handleSignUp = () =>{
        this.props.navigation.navigate('SignUp')
    }

render(){
    return(
        <View style={styles.container}>
            <Text style= {{textAlign:'center'}}>Login</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
            </Text>}
            <TextInput
            placeholder="Email"
            placeholderTextColor="#ffff" 
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
                placeholderTextColor="#ffff" 
                autoCapitalize = "none"
                style={styles.textInput}
                onChangeText={
                    password => this.setState({password})
                }
                value = {this.state.password}   
            />
            <View>
                <TouchableHighlight
                    style={styles.buttonStyle}
                    onPress={this.handleLogin}
                    >  
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
            <View>
                <TouchableHighlight
                    style={styles.buttonStyle}
                    onPress={this.handleSignUp}
                    >  
                    <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
                </TouchableHighlight> 
            </View>        
        </View>
    )
}

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor: '#73c3fb',
        // alignItems:'center'
    },
    textInput:{
        height: 40,
        paddingLeft: 6
    },
    buttonStyle :{
        backgroundColor:"#003153",
        height: 45,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width : "75%"
    },
    buttonText: {      
        padding: 4,
        marginRight: 10,
        fontSize: 18,
        color: '#ffffff',
        alignSelf: 'center'
      },
      main: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#73c3fb',
      }
})