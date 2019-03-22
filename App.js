import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  f,
  db
} from './config/config';
import Announcements from './screens/Announcements';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Main from './screens/Main';
import Profile from './screens/Profile';
import Sem from './screens/Sem';
import Notes from './screens/Notes';
import Todo from './screens/Todo';
import Loading from './components/Loading';
import createAnnouncement from './components/createAnnouncement';
import createPost from './components/createPost';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';

const HomeStack = createStackNavigator({
  Main,
  Announcements,
})

const AuthStack = createStackNavigator({
  Login,
  SignUp,
  Loading
})

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile
  },

}, {
  navigationOptions: {
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
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
  }
})

const SemNavigator = createStackNavigator({
  Sem: {
    screen: Sem
  },

}, {
  navigationOptions: {
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
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
  }
})

const TodoNavigator = createStackNavigator({
  Todo: {
    screen: Todo
  },

}, {
  navigationOptions: {
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
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
  }
})

const NotesNavigator = createStackNavigator({
  Notes: {
    screen: Notes
  },

}, {
  navigationOptions: {
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
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
  }
})

const HomeNavigator = createStackNavigator({
  Main: {
    screen: Main
  },
  createPost: {
    screen: createPost
  }

}, {
  navigationOptions: {
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
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
  }
})

const AnnouncementsNavigator = createStackNavigator({
  Announcements: {
    screen: Announcements,
  },
  createAnnouncement: {
    screen: createAnnouncement
  }
  // CreatePost:{
  //   screen:CreatePost
  // },
  // Create:{
  //   screen:Create
  // }
}, {
  navigationOptions: {
    navigationOptions: ({
      navigation
    }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
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
  }
})

const AppDrawerNavigator = createDrawerNavigator(

  {
    Main: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Home'
      }
    },
    Announcements: {
      screen: AnnouncementsNavigator
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        title: 'Profile'
      }
    },
    Notes: {
      screen: NotesNavigator,
      navigationOptions: {
        title: 'Notes'
      }
    },
    Todo: {
      screen: TodoNavigator,
      navigationOptions: {
        title: 'Todo'
      }
    },
    Sem: {
      screen: SemNavigator,
      navigationOptions: {
        title: 'Sem'
      }
    },
  })

export default createSwitchNavigator({
  AuthLoading: AuthStack,
  Home: AppDrawerNavigator,
}, {
  initialRouteName: 'Home',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
