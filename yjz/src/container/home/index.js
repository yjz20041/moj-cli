/* eslint-disable react/prop-types */
import React from 'react';
import {
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PropTypes } from 'prop-types';
import { connectByModule } from '@redux/store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        position: 'relative',
    },
});

@connectByModule('home', state => ({
    saidWords: state.home.saidWords
}))
class Home extends React.PureComponent {
    render() {
        const {
            saidWords
        } = this.props;
        return (
            <SafeAreaView style={
                styles.container
            }>
                <Text>home2</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('detail')}
                    title="go to detail" />
                <Button
                    onPress={() => this.props.actions.say('hello')}
                    title="dispatch action" />
                <Text>{saidWords}</Text>
            </SafeAreaView>
        );
    }
}
Home.propTypes = {
    saidWords: PropTypes.string
};
Home.defaultProps = {
    saidWords: ''
};

export default Home;
