import React, { Component } from 'react';
import { View, Text } from 'react-native';

class createPost extends Component {
    static navigationOptions =({navigation})=>({
        title:'Create Post'
    })

    render() {
        return(
            <View><Text>Create Post Component</Text></View>
        );
    }
}


export default createPost;