import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ImageBackground
} from 'react-native';
import {
    Icon,
    Avatar,
    Card,
    Button
} from 'react-native-elements';
import {
    f
} from '../config/config';
import { FontAwesome } from '@expo/vector-icons';
import Divider from 'react-native-divider';

class Profile extends Component {

    state = {
        name: '',
        mobileNumber: '',
        email: '',
        userName: '',
        loading: true
    }

    componentDidMount() {
        try{
            var userId = f.auth().currentUser.uid;
        }
        catch{
            this.props.navigation.navigate('Login')
        }
        f.database().ref("users/" + userId).once('value').then(
            (snapshot) => {
                this.setState({
                    email: snapshot.val().email,
                    name: snapshot.val().fullName,
                    mobileNumber: snapshot.val().mobileNumber,
                    userName: snapshot.val().username,
                    loading:false
                })
                console.log(snapshot.val().username);
            }
        )
    }
    signOutUser =  () => {
        f.auth().signOut()
        .then(this.props.navigation.navigate('Login'))
        .catch("Can;t help ")
    }

    getInitials = () =>{
        name = this.state.name;
        words = name.split(" ");
        if(words.length >= 2){
            return words[0][0].toUpperCase()+words[1][0].toUpperCase()
        }
        else{
            return name[0].toUpperCase();
        }
    }

    static navigationOptions = ({
        navigation
    }) => ({
        title: 'Profile',
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

    render() {
        if(this.state.loading){
            return(
                <View>
                    <ActivityIndicator/>
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <View
                        style= {{padding:10}}
                    >
                        <Avatar
                            size="xlarge"
                            title={this.getInitials()}
                            rounded
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            showEditButton
                        />
                    </View>                    
                    <Divider borderColor="#00CCCD" color="black" orientation="center">Details <FontAwesome name="address-card-o" size={20}/></Divider>
                    <View>

                        <Card
                            title={this.state.name}
                            containerStyle = {styles.cardShow}
                        >
                    <ImageBackground
                            source={require('../assets/bgCard.png')}
                            style={{
                                width: 340,                                
                                height: 200,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight:5
                              }}
                        >
                        <View style= {styles.containerInside}>
                        <Text style={{fontWeight: "bold", padding: 10, color: 'white'}}><FontAwesome name="user-circle-o" size={20} /> {this.state.userName}</Text>
                        <Text style={{fontWeight: "bold", padding:10,color: 'white'}}><FontAwesome name="envelope-o" size={20}/> {this.state.email}</Text>
                        <Text style={{fontWeight: "bold", padding:10,color: 'white'}}><FontAwesome name="phone" size={20}/> {this.state.mobileNumber}</Text>
                        </View>
                        </ImageBackground>
                        </Card>
                        
                        <Button
                            buttonStyle={{
                                padding:10,
                                margin:15,
                                backgroundColor:"#003153"
                            }}
                            icon={
                            <FontAwesome name="sign-out" size={25} style={{ color: 'red' }} />
                            }                            
                            title="Logout "
                            onPress ={this.signOutUser}
                            />                            
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        padding: 10,
        margin: 15    
    },
    textInput:{
        height: 40,
        width:'90%',
        borderColor:'gray',
        borderWidth:1,
        marginTop:8
    },
    cardShow : {
        height: 275,
        width: 370
    },
    containerInside:{        
        justifyContent:'center',
        padding: 5,
        margin: 10,        
    }
})

export default Profile;