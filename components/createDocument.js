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
        branch: 'CSE',
        sem : 'Sem1'
    }

    static navigationOptions = ({
        navigation
    }) => ({
        title: 'Add Doc',
        headerStyle: {
            backgroundColor: "#355876"
        },
        headerTintColor: '#fff',
        headerLeft: < Icon
        name = 'menu'
        size = {
            30
        }
        color = 'white'
        onPress = {
            () => navigation.toggleDrawer()
        }
        />
    })

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
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
        console.log("File path: ", FilePath)
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

    static navigationOptions = ({
        navigation
    }) => ({
        title: 'Add Doc',
        headerTintColor: '#129cf3',
        // backgroundColor:"#003153",
        headerTitleStyle: {
            color: "#129cf3"
        },
    })

    processUpload = (docUrl) => {
        var userId = f.auth().currentUser.uid;
        var dataTime = Date.now();
        var timestamp = Math.floor(dataTime / 1000);
        var docId = this.uniqueID();
        var fileOriginalName = this.state.name;
        var semesterNumber = this.state.sem;
        var docObj = {
            author: userId,
            posted: timestamp,
            url: docUrl,
            sem: semesterNumber,
            fileOriginal : fileOriginalName
        };
        // TODO Firebase update
        database.ref('/docs/' + this.state.branch + "/" + docId).set(docObj);
        alert("Document Uploaded!");
        this.props.navigation.navigate('Main');

    }
    _pickDocument = async () => {
        console.log(this.state);
        let result = await DocumentPicker.getDocumentAsync({});
        //   alert(result.uri);
        console.log(this.state.sem)
        console.log(result);
        this.setState({
            uri: result.uri,
            name: result.name
        })
        this.uploadDocument(this.state.uri)
    }
    render() {
        return(
            <View style= {styles.container}>
                <Picker
                    selectedValue={this.state.branch}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({branch: itemValue})}>
                    <Picker.Item label="CSE" value="CSE" />
                    <Picker.Item label="EEE" value="EEE" />
                    <Picker.Item label="MECH" value="MECH" />
                    <Picker.Item label="CE" value="CE" />
                </Picker>
                <Picker
                    selectedValue={this.state.sem}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({sem: itemValue})}>
                    <Picker.Item label="Semester 1" value="Sem1" />
                    <Picker.Item label="Semester 2" value="Sem2" />
                    <Picker.Item label="Semester 3" value="Sem3" />
                    <Picker.Item label="Semester 4" value="Sem4" />
                    <Picker.Item label="Semester 5" value="Sem5" />
                    <Picker.Item label="Semester 6" value="Sem6" />
                    <Picker.Item label="Semester 7" value="Sem7" />
                    <Picker.Item label="Semester 8" value="Sem8" />
                </Picker>
                <Button
                    buttonStyle={{
                        padding:10,
                        margin:15,
                        backgroundColor:"#003153"
                    }}
                    title="Choose doc and upload!"
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