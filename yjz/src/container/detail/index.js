import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// eslint-disable-next-line react/prefer-stateless-function
class Detail extends React.PureComponent {
    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>detail</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default Detail;
