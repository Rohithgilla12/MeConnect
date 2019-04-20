import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Permissions,ImagePicker } from 'expo';
import {f,auth, storage} from '../config/config';

class createPost extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Post'
    })

    constructor(props) {
        super(props);
        this.state = {
            imageId: this.uniqueID()
        }
        // alert(this.uniqueID());
    }

    s4 = () => {
        return Math.floor((1+ Math.random())* 0x10000).toString(16).substring(1);
    }

    uniqueID = () => {
        return this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_';
    }

    _checkPermissions = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera:status})
        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({camera:statusRoll})
    }
    uploadImage = async(uri)=>{

        var that  = this;
        var userId = f.auth().currentUser.uid;
        var imageId = this.state.imageId;

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];
        this.setState({
            currentFileType : ext
        });

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
        var FilePath = imageId+'.'+that.state.currentFileType;
        const ref = storage.ref('user/'+userId+'/img').child(FilePath);
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
                    style= { styles.selectImage }
                >
                    <Text
                        style = {styles.textHeading}
                    >Select Photo</Text>
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
    },
    selectImage:{
        backgroundColor: '#129CF3',
        padding: 20,
        borderRadius: 10,
    },
    textHeading : {
        color: '#fff'
    }
})

export default createPost;