import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Permissions,ImagePicker } from 'expo';
import {f,auth, storage} from '../config/config';

class createPost extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Post'
    })

    _checkPermissions = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera:status})
        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({camera:statusRoll})
    }
    uploadImage = async(uri)=>{
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.onerror = function() {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
          });
        // const response = await fetch(uri);
        // const blob  = await response.blob();
        var FilePath = 'life3.jpeg'
        const ref = storage.ref('postPics/').child(FilePath)
        var snapshot = ref.put(blob).on('state_changed', snapshot =>{
            console.log('Progress',snapshot.bytesTransferred, snapshot.totalBytes)
        });
        const snapshot = await ref.put(blob)
        blob.close();
    }
    fineNewImage = async() => {
        this._checkPermissions();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:'Images',
            allowsEditing:true,
            quality:1
        })
        console.log(result);
        if(!result.cancelled){
            console.log('Upload Image')
            this.uploadImage(result.uri)
        }
        else{
            console.log('Cancel Image')

        }
    }
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=> this.fineNewImage()}
                >
                    <Text>Select Photo</Text>
                </TouchableOpacity>
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

export default createPost;