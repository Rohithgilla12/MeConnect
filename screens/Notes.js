import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList
} from 'react-native'
import {
    f,
    auth,
    storage,
    database
} from '../config/config';
import ActionButton from 'react-native-action-button';
import {
    Card,
    ListItem,
    Icon,
    Divider
} from 'react-native-elements';

console.ignoredYellowBox = ['Setting a timer'];

export default class Notes extends React.Component {
        constructor() {
            super();
            this.unsubscribe = null;
            this.state = {
                textInput: '',
                loading: true,
                notesRaw: [],
                refresh: false
            };
        }

        static navigationOptions = ({
            navigation
        }) => ({
            title: 'Notes',
            headerStyle: {
                backgroundColor: "#355876"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            },
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

        fetchNotes = () => {
            this.setState({
                // refresh:true,
                notesRaw:[]
            });
            try {
                var userId = f.auth().currentUser.uid;
            } catch {
                this.props.navigation.navigate('Login')
            }
            var that = this;
            data = database.ref('users/' + userId + '/Notes/').once('value').then(function (snapshot) {
                console.log(snapshot);
                const exists = (snapshot.val() != null);
                if(exists) data = snapshot.val();                    
                    var notesFeed = that.state.notesRaw;                    
                    for(var note in data){
                        notesFeed.push({
                            posted: that.timeConverter(data[note].timestamp),
                            noteText : data[note].name
                        })
                    }
            });
        }

        componentDidMount() {
            this.fetchNotes();            
            console.log(this.state.notesRaw)
        }
      
  render() {
    return (
            <View style={styles.container}>
                <FlatList
                    refreshing = {this.state.refresh}
                    onRefresh = {this.fetchNotes}
                    data = {this.state.notesRaw}
                    keyExtractor = {(item, index) => index.toString()}
                    style = {{ flex:1}}
                    renderItem = {({item, index}) => (
                        
                        <View key= {index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between'}}>
                            <View>
                                <Card>
                                <Text style={{ marginBottom: 10 }}>
                                    {item.caption}
                                </Text>
                                <View>
                                    <Text>{item.noteText}</Text>                                    
                                </View>
                                < Divider style = {
                                    {
                                        backgroundColor: '#616C6F'
                                    }
                                }
                                />
                                < View style = {
                                    {
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'stretch',
                                        flexDirection: 'column'
                                    }
                                } >
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
                this.props.navigation.navigate('createNote')
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
    marginTop:40
  },
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#616C6F',
    fontSize: 10,    
    textAlign: 'right'
  }
})