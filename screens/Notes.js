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
import ActionButton from 'react-native-action-button';

class Notes extends Component {
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

    render() {
        return(
            <View>
                <Text>Notes Component</Text>
                <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { 
                this.props.navigation.navigate('createNote')                
            }}
                />
            </View>
        );
    }
}

export default Notes;