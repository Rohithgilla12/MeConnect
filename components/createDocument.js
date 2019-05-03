import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Picker
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
        branch:'CSE'
    }

    static navigationOptions =({navigation})=>({
        title:'Add Doc',
        headerStyle: {
            backgroundColor: "#355876"
        },
        headerTintColor: '#fff',
        headerLeft : <Icon 
                            name='menu' 
                            size={30}
                            color='white'
                            onPress={()=>navigation.toggleDrawer()}
                    />
    })

    s4 = () => {
        return Math.floor((1+ Math.random())* 0x10000).toString(16).substring(1);
    }

    uniqueID = () => {
        return this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_' + this.s4() + this.s4() + '_';
    }

    uploadDocument = async (uri) => {
        var that = this;
        var userId = f.auth().currentUser.uid;
        var docId = this.uniqueID();

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
        var FilePath = docId + that.state.name;
        console.log("File path: ",FilePath)
        const uploadTask = storage.ref('user/' + userId + '/doc').child(FilePath).put(blob);
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

    // fineNewDoc = async() => {
    //     let result = await DocumentPicker.getDocumentAsync({
    //         type:'application/pdf',
    //     });
    //     console.log("Here!",result.name);        
    //     if(!result.cancelled){
    //         console.log('Upload Doc')
    //         this.setState({
    //             imageSelected: true,
    //             docId: this.uniqueID(),
    //             uri : result.uri,
    //             name : result.name
    //         })
    //         // this.uploadImage(result.uri)
    //     }
    //     else{
    //         console.log('Cancel Doc')
    //         this.setState({
    //             imageSelected:false
    //         })
    //     }
    // }

    static navigationOptions =({navigation})=>({
        title:'Add Doc',
        headerTintColor: '#129cf3',
        headerTitleStyle: {
            color: "#129cf3"
        },
    })

    processUpload = (docUrl) => {
        var userId = f.auth().currentUser.uid;        
        var dataTime = Date.now();
        var timestamp = Math.floor(dataTime/1000);
        var docId = this.uniqueID();
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
        console.log(this.state);
	    let result = await DocumentPicker.getDocumentAsync({});
		//   alert(result.uri);
      console.log(result);
      this.setState({
          uri: result.uri,
          name : result.name
      })
      this.uploadDocument(this.state.uri)
	}
    render() {
        return(
            <View style= {styles.container}>
                <Picker
                    selectedValue={this.state.branch}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({branch: itemValue})}>
                    <Picker.Item label="CSE" value="CSE" />
                    <Picker.Item label="EEE" value="EEE" />
                    <Picker.Item label="MECH" value="MECH" />
                    <Picker.Item label="CE" value="CE" />
                </Picker>
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