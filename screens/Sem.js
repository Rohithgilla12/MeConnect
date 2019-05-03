import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {
    Card,
    ListItem,
    Button,
    Icon
} from 'react-native-elements'



class Sem extends Component {

    static navigationOptions = ({
        navigation
    }) => ({
        title: 'Semester',
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

    handleSem1 = () => {
        console.log("Sem1")
        this.props.navigation.navigate('sem1');
    }

    render() {
        return(
            <ScrollView>                
                <View style = {styles.boxOddEven}>
                    <Card
                        // image={require('../images/sem1.jpg)}
                        containerStyle = {styles.cardShow}
                        title='CSE'>
                        <Text style={{marginBottom: 10}}>
                        </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            onPress = {this.handleSem1}
                             />
                    </Card>
                    <Card
                        // image={require('../images/sem1.jpg)}
                        containerStyle = {styles.cardShow}
                        title='EEE'>
                        <Text style={{marginBottom: 10}}>
                        </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            // title='VIEW'
                            onPress = { () => {this.props.navigation.navigate('eee')}}
                             />
                    </Card>
                </View>
                <View style = {styles.boxOddEven}>
                    <Card
                        // image={require('../images/sem1.jpg)}
                        containerStyle = {styles.cardShow}
                        title='CE'>
                        <Text style={{marginBottom: 10}}>
                        </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            // title='VIEW'
                            onPress = { () => {this.props.navigation.navigate('civil')}}
                             />
                    </Card>
                    <Card
                        containerStyle = {styles.cardShow}
                        // image={require('../images/sem1.jpg)}
                        title='MECH'>
                        <Text style={{marginBottom: 10}}>
                        </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            // title='VIEW'
                            onPress = { () => {this.props.navigation.navigate('mech')}}
                             />
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    boxOddEven:{
        flex: 1,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 15
      },
      cardShow : {
        width: 180
    }
})

export default Sem;

