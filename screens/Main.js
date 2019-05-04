import React from 'react'
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    Button,
    FlatList
} from "react-native";
import {
    f,
    auth,
    storage,
    db,
    database
} from '../config/config';
import ActionButton from 'react-native-action-button';
import {
    createStackNavigator,
    createDrawerNavigator,
    DrawerItems,
    SafeAreaView,
    createAppContainer
} from 'react-navigation';
import {
    Card,
    ListItem,
    Icon,
    Divider
} from 'react-native-elements';
import Announcements from './Announcements';
console.ignoredYellowBox = ['Setting a timer'];
export default class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentUser:null,
            photoFeed : [0,1,2,3,4],
            refresh: false
        }
    }

    loadNew = () => {
        this.loadFeed();
        // this.setState({
        //     refresh: true
        // });
        // this.setState({
        //     photoFeed : [5,6,7,8,9],
        //     refresh: false
        // })
    }

    pluralCheck = (s) =>{
        if(s == 1){
            return ' ago';
        }
        else{
            return 's ago';
        }
    }

    timeConverter = (timestamp) =>{
        var a = new Date(timestamp*1000);
        var seconds = Math.floor((new Date() - a)/ 1000);

        var interval = Math.floor(seconds/ 31536000);
        if(interval >1){
            return interval+' year'+this.pluralCheck(interval);
        }
        interval = Math.floor(seconds/ 2592000);
        if(interval >1){
            return interval+' month'+this.pluralCheck(interval);
        }
        interval = Math.floor(seconds/ 86400);
        if(interval >1){
            return interval+' day'+this.pluralCheck(interval);
        }
        interval = Math.floor(seconds/ 3600);
        if(interval >1){
            return interval+' hour'+this.pluralCheck(interval);
        }
        interval = Math.floor(seconds/ 60);
        if(interval >1){
            return interval+' minute'+this.pluralCheck(interval);
        }
        return Math.floor(seconds)+ ' second'+this.pluralCheck(interval);
    }

    static navigationOptions =({navigation})=>({
        title:'Home',
        headerStyle: {
            backgroundColor: "#355876"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        },
        headerLeft : <Icon 
                            name='menu' 
                            size={30}
                            color='white'
                            onPress={()=>navigation.toggleDrawer()}
                    />
    })

    componentDidMount(){
        const {currentUser} = f.auth()
        this.setState({ currentUser })
        this.loadFeed();
        console.log(this.state.photoFeed);
    }

        addToFlatList = (photoFeed, data, photo) => {
            var that = this; 
            var photoObj = data[photo];
            console.log(photoObj);
            database.ref('users').child(photoObj.author).once('value').then(function (snapshot) {
                const exists = (snapshot.val() != null);
                if (exists) data = snapshot.val();
                photoFeed.push({
                    id: photo,
                    url: photoObj.url,
                    caption: photoObj.caption,
                    author: data.username,
                    posted: that.timeConverter(photoObj.posted)
                });
                that.setState({
                    refresh: false,
                    loading: false
                });
            })
        }

    loadFeed = () =>{
        this.setState({
            refresh:true,
            photoFeed:[]
        });

        var that  = this;

        database.ref('photos').orderByChild('posted').once('value').then(function(snapshot){
            const exists = (snapshot.val() != null);
            if(exists) data = snapshot.val();
               var photoFeed = that.state.photoFeed;
               for(var photo in data) {
                that.addToFlatList(photoFeed,data, photo)
                //    var photoObj = data[photo];
                //    console.log(photoObj);
                //    database.ref('users').child(photoObj.author).once('value').then(function(snapshot){
                //     const exists = (snapshot.val() != null);                    
                //     if(exists) data = snapshot.val();   
                //         photoFeed.push({
                //            id: photo,
                //            url : photoObj.url,
                //            caption: photoObj.caption,
                //            author: data.username,
                //            posted : photoObj.posted
                //        });
                //        that.setState({
                //           refresh:false,
                //           loading: false 
                //        });
                //    })
               }
        })
    }

    signOutUser =  () => {
        f.auth().signOut()
        .then(this.props.navigation.navigate('Login'))
        .catch("Can;t help ")
    }

    createPost= ()=>{
        this.props.navigation.navigate('Create')
    }



    render(){
        const {currentUser} = this.state
        return(
            <View style={styles.container}>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {this.loadNew}
                    data = {this.state.photoFeed}
                    keyExtractor = {(item, index) => index.toString()}
                    style = {{ flex:1, backgroundColor:"#eee"}}
                    renderItem = {({item, index}) => (
                        
                        <View key= {index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between'}}>
                            <View>
                                {/* <Image
                                    source = {{uri: item.url}}
                                    style = {{resizeMode: 'cover', width:'100%', height: 275}}
                                /> */}
                                <Card                                    
                                    image = {{uri: item.url}}
                                    imageStyle = {{
                                        height: 275,                                        
                                    }}
                                    
                                >
                                <Text style={{ marginBottom: 10 }}>
                                    {item.caption}
                                </Text>
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                >
                                    <Text style={styles.noteStyle}>{item.author}</Text>
                                    <Text style={styles.noteStyle}>{item.posted}</Text>
                                </View>
                                <Divider style={{ backgroundColor: '#dfe6e9' }} />
                                </Card>                                
                            </View>
                            
                        </View>
                    )}
                    />

                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { 
                        this.props.navigation.navigate('createPost')                        
                        }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    textInput:{
        height: 40,
        width:'90%',
        borderColor:'gray',
        borderWidth:1,
        marginTop:8
    },
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#616C6F',
        fontSize: 10
      }
})