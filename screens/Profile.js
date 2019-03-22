import React, {
    Component
} from 'react';
import {
    View,
    Text
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import {
    f
} from '../config/config';

class Profile extends Component {

    state = {
        name: '',
        mobileNumber: '',
        email: '',
        userName: '',
        loading: true
    }

    componentDidMount() {
        var userId = f.auth().currentUser.uid;
        f.database().ref("users/" + userId).once('value').then(
            (snapshot) => {
                this.setState({
                    email: snapshot.val().email,
                    name: snapshot.val().fullName,
                    mobileNumber: snapshot.val().mobileNumber,
                    userName: snapshot.val().userName
                })
                console.log(snapshot.val());
                console.log(snapshot.val().email);
            }
        )
        this.setState({
            loading:false
        })
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

    details = ()=>{
        <Text>                    
            Welcome, {this.state.fullName}!!
            User Name : {this.state.userName}
            Email : {this.state.email}
            Mobile Number : {this.state.mobileNumber}
        </Text>
    }

    render() {
        if(this.state.loading){
            return(
                <View>
                    <Text>Loading!!!</Text>
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text>                    
                        Welcome, {this.state.fullName}!!
                        User Name : {this.state.userName}
                        Email : {this.state.email}
                        Mobile Number : {this.state.mobileNumber}
                    </Text>
                </View>
            )
        }
    }
}

export default Profile;