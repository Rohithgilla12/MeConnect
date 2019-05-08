import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Linking
} from 'react-native'
import {
  f,
  auth,
  storage,
  db,
  database
} from '../config/config';
import ActionButton from 'react-native-action-button';
import {
  Card,
  ListItem,
  Icon,
  Divider
} from 'react-native-elements';

import {
  Constants,
  WebBrowser
} from 'expo';
import Anchor from './Anchor';

export default class sem1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      docFeed: [],
      refresh: false
    }
  }
  loadNew = () => {
    this.loadFeed();
  }
  pluralCheck = (s) => {
    if (s == 1) {
      return ' ago';
    } else {
      return 's ago';
    }
  }

  timeConverter = (timestamp) => {
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' year' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' month' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' day' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hour' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minute' + this.pluralCheck(interval);
    }
    return Math.floor(seconds) + ' second' + this.pluralCheck(interval);
  }

  static navigationOptions = ({
    navigation
  }) => ({
    title: 'CSE',
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
  addToFlatList = (docFeed, data, photo) => {
    var that = this; 
    var docObj = data[photo];
    console.log("Logging in ",docObj);
    database.ref('users').child(docObj.author).once('value').then(function (snapshot) {          
        const exists = (snapshot.val() != null);
        if (exists) data = snapshot.val();
        // console.log("Snapshot ",snapshot);
        docFeed.push({
            id: photo,
            url: docObj.url,
            // caption: docObj.caption,
            author: data.author,
            posted: that.timeConverter(docObj.posted)
        });
        that.setState({
            refresh: false,
            loading: false
        });
    })
    this.state.docFeed = docFeed;
}
  loadFeed = () =>{
    this.setState({
        // refresh:true,
        docFeed:[]
    });

    var that  = this;

    database.ref('docs/CSE/').orderByChild('posted').once('value').then(function(snapshot){
        const exists = (snapshot.val() != null);
        if(exists) data = snapshot.val();
           var docFeed = that.state.docFeed;
           for(var photo in data) {
            // that.addToFlatList(docFeed,data, photo)
            docObj = data[photo]
            database.ref('users').child(docObj.author).once('value').then(function (snapshot) {
                docFeed.push({
                  author : snapshot.val().username,
                  url : docObj.url,
                  posted : that.timeConverter(docObj.posted),
                  fileName : docObj.fileOriginal,
                  semester : docObj.sem
                })
                console.log(docObj,"Doc obj")
            })
           }
    })
}

  componentDidMount() {
    this.loadFeed();
    console.log("Doc feed arr",this.state.docFeed);
  }

render() {
  return (
          <View style={styles.container}>            
          <FlatList
                  refreshing = {this.state.refresh}
                  onRefresh = {this.loadFeed}
                  data = {this.state.docFeed}
                  keyExtractor = {(item, index) => index.toString()}
                  style = {{ flex:1}}
                  renderItem = {({item, index}) => (
                      
                      <View key= {index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between'}}>
                          <View>
                              <Card
                                containerStyle = {styles.cardShow}
                              >
                              <View>
								<Text>Sem : {item.semester}</Text>
								<Text>File Name : {item.fileName}</Text>
                              </View>
                              <View> 
                                   <Anchor  style= {{color:"#129cf3"}} href={item.url}>File Link</Anchor>                                  
                              </View>
                              < Divider style = {
                                  {
                                      backgroundColor: '#616C6F'
                                  }
                              }
                              />
                              <View
                                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                              >
                                  <Text style={styles.noteStyle}>{item.author}</Text>
                                  <Text style={styles.noteStyle}>{item.posted}</Text>
                              </View>                                
                              </Card>                                
                          </View>
                          
                      </View>
                  )}
                  /> 
          <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => { 
              this.props.navigation.navigate('createDocument')
          }}
              />
          </View>
          )
      }

        }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#616C6F',
    fontSize: 10
  },
  cardShow : {    
    width: 370
}
})