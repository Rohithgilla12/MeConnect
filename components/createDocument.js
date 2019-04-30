import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button
} from 'react-native';
import {
    DocumentPicker
} from 'expo';

import {
    f,
    auth,
    storage,
    database
} from '../config/config';

export default class sem1 extends Component {

    state = {

    }

    s4 = () => {
        return Math.floor((1+ Math.random())* 0x10000).toString(16).substring(1);
    }

    uniqueID = () => {
        return this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_';
    }

    uploadDocument = async (uri) => {
        var that = this;
        var userId = f.auth().currentUser.uid;
        var docId = this.state.docId;

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];
        this.setState({
            currentFileType: ext
        });

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        var FilePath = docId + '.' + that.state.currentFileType;
        const uploadTask = storage.ref('user/' + userId + '/doc').child("stuff.pdf").put(blob);
        uploadTask.on("state_changed", function (snapshot) {
            console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes)
        }, function (error) {
            console.log("Error with upload" + error);
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log(downloadURL);
                alert(downloadURL);
                that.processUpload(downloadURL);
            });
        })
    }

    fineNewDoc = async() => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        if(!result.cancelled){
            console.log('Upload Doc')
            this.setState({
                imageSelected: true,
                docId: this.uniqueID(),
                uri : result.uri
            })
            // this.uploadImage(result.uri)
        }
        else{
            console.log('Cancel Doc')
            this.setState({
                imageSelected:false
            })
        }
    }

    static navigationOptions =({navigation})=>({
        title:'Sem 1',
        headerTintColor: '#129cf3',
        headerTitleStyle: {
            color: "#129cf3"
        },
    })

    processUpload = (docUrl) => {
        var userId = f.auth().currentUser.uid;        
        var dataTime = Date.now();
        var timestamp = Math.floor(dataTime/1000);
        var docId = this.state.docId;
        var docObj = {
            author : userId,
            posted : timestamp,
            url : docUrl
        };
        // TODO Firebase update
        database.ref('/docs/'+docId).set(docObj);
        alert("Document Uploaded!");
        this.props.navigation.navigate('Main');

    }
    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		//   alert(result.uri);
      console.log(result);
      this.setState({uri:result.uri})
      this.uploadDocument(this.state.uri)
	}
    render() {
        return(
            <View style= {styles.container}>
                <Button
          title="Select Document"
          onPress={this._pickDocument}
        />
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