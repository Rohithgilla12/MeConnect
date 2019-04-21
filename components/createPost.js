import React, {
    Component
} from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Image

} from 'react-native';
import {
    Permissions,
    ImagePicker
} from 'expo';
import {
    f,
    auth,
    storage,
    database
} from '../config/config';


class createPost extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Post'
    })

    constructor(props) {
        super(props);
        this.state = {
            imageId: this.uniqueID(),
            imageSelected: false,
            uploading : true,
            caption : ''
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
    uploadPublish = () => {
        if(this.state.caption != ''){
            this.uploadImage(this.state.uri);
        }
        else{
            alert("Please enter a caption!!");
        }
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
        const uploadTask = storage.ref('user/'+userId+'/img').child(FilePath).put(blob);
        uploadTask.on("state_changed", function(snapshot){
            console.log('Progress',snapshot.bytesTransferred, snapshot.totalBytes)
        }, function(error){
            console.log("Error with upload"+ error);
        }, function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                console.log(downloadURL);
                alert(downloadURL);
                that.processUpload(downloadURL);
            });
        })
        // var snapshot = ref.put(blob).on('state_changed', snapshot =>{
        //     console.log('Progress',snapshot.bytesTransferred, snapshot.totalBytes)            
        // });
        // const snapshot = await ref.put(blob)
        // blob.close();
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
            this.setState({
                imageSelected: true,
                imageId: this.uniqueID(),
                uri : result.uri
            })
            // this.uploadImage(result.uri)
        }
        else{
            console.log('Cancel Image')
            this.setState({
                imageSelected:false
            })
        }
    }

    processUpload = ( imageUrl ) => {

        var userId = f.auth().currentUser.uid;
        var caption = this.state.caption;
        var dataTime = Date.now();
        var timestamp = Math.floor(dataTime/1000);
        var imageId = this.state.imageId;
        var photoObj = {
            author : userId,
            caption : caption,
            posted : timestamp,
            url : imageUrl
        };
        // TODO Firebase update
        database.ref('/photos/'+imageId).set(photoObj);
        alert("Image Uploaded!");
        this.props.navigation.navigate('Main');
    }
    // renderActivityMonitor = () => {
    //     if(this.state.uploading){
    //         return
    //     }
    // }
    render() {
        if(this.state.imageSelected){
            return(
                <View style={styles.container}>
                    <Image
                        source = {{uri : this.state.uri}}
                        style = {{marginTop:10, resizeMode: 'cover', width: '100%', height: '65%'}}
                    />
                    <Text                        
                    >Caption
                    </Text>
                    <TextInput
                        editable = {true}
                        placeholder = {"Caption"}
                        multiline = {true}
                        onChangeText = { (text) => this.setState({caption: text})}
                        style = {styles.textInput}
                    />
                    <View style={{flex:0.1}}/>
                    <TouchableOpacity
                        onPress = { () => this.uploadPublish() }
                        style= { styles.selectImage }
                    >
                    
                    <Text>Upload and Post</Text>
                    </TouchableOpacity>
                    
                </View>
            )
        }
    else{ 
        return(
           <View style={{flex:1}}>
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
            </View>
        );
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        height: 90,
        width:'80%',
        borderColor:'gray',
        borderWidth:1,
        marginTop:8,
        padding: 15,
        backgroundColor: 'white'  
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