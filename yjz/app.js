import 'react-native-gesture-handler';
import React from 'react';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import { Provider } from 'react-redux';
import store from '@redux/store';

import { RouteConfig, InitConfig } from './src/route';

const AppNavigator = createStackNavigator(RouteConfig, InitConfig());
const AppContiner = createAppContainer(AppNavigator);


// eslint-disable-next-line react/prefer-stateless-function
class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <AppContiner />
            </Provider>
        );
    }
}

export default App;

// import 'react-native-gesture-handler';
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { enableScreens } from 'react-native-screens';


// import { Provider } from 'react-redux';
// import store from '@redux/store';
// import Home from '@container/home';
// import Detail from '@container/detail';

// enableScreens();
// const Stack = createStackNavigator();

// // eslint-disable-next-line react/prefer-stateless-function
// class App extends React.PureComponent {
//     render() {
//         return (
//             <SafeAreaProvider>
//                 <Provider store={store}>
//                     <NavigationContainer>
//                         <Stack.Navigator>
//                             <Stack.Screen
//                                 name="home"
//                                 component={Home} />
//                             <Stack.Screen name="detail" component={Detail} />
//                         </Stack.Navigator>
//                     </NavigationContainer>
//                 </Provider>
//             </SafeAreaProvider>
//         );
//     }
// }

// export default App;
