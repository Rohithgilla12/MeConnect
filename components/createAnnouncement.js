import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {KeyboardAvoidingView} from 'react-native';
//import { db } from '../config';
//import {f,auth, storage} from '../config/config';
import {  
    TouchableHighlight,
    StyleSheet,
    TextInput,
    AlertIOS
  } from 'react-native';
import { f } from '../config/config';
  
  export default class createAnnouncement extends Component {  
    state = {
      name: '',
      text:''
    };
  
    s4 = () => {
        return Math.floor((1+ Math.random())* 0x10000).toString(16).substring(1);
    }

    uniqueID = () => {
        return this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_';
    }

    handleSubmit = () =>{
        if (this.state.text != '')
        { 
            f.database().ref('Announcements/'+this.uniqueID()).set({
                name : this.state.text,
                timestamp : Math.floor(Date.now()/1000),
                user : f.auth().currentUser.uid
            });
            console.log(this.state.text);
            this.props.navigation.goBack();
            this.props.navigation.navigate('Announcements'); 
        } 
        else { alert("Please Enter Text")   }
        
    }

    handleChange = e => {
      this.setState({
        name: e.nativeEvent.text
      });
    };

  
    render() {
        return (
          <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
            <Text style={styles.title}></Text>
                
                <TextInput  style={styles.itemInput} editable = {true} multiline={true}  placeholder="Make Announcement" onChangeText={(text) => this.setState({text})}
            value={this.state.text} />
            
                <TouchableHighlight
                style={styles.button}
                
                underlayColor="aqua"
                //type="clear"
                onPress={this.handleSubmit}
                >  
                <Text style={styles.buttonText}>Post</Text>
                </TouchableHighlight>
    </KeyboardAvoidingView>
            
          
        );
      }
    }

    const styles = StyleSheet.create({  
        main: {
          flex: 1,
          padding: 20,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff8dc',
          
        },
        title: {
          marginBottom: 90,
          fontSize: 20,
          textAlign: 'center'
        },
        itemInput: {
          height: 150,
          padding: 4,
          
          marginRight: 5,
          fontSize: 18,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 8,
          color: 'black',
          alignItems: 'stretch',
          //flex: 1
        },
        buttonText: {
       
          padding: 4,
          marginRight: 10,
          fontSize: 18,
          color: '#191970',
          alignSelf: 'center'

        },
        button: {
            
            height: 45,
            
            flexDirection: 'row',
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 5,
            borderRadius: 8,
            marginBottom: 100,
            marginTop: 10,
            alignItems: 'center',
            //alignSelf: 'stretch',
            justifyContent: 'center'

          }
        });

