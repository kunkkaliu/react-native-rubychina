/**
 * Created by liudonghui on 2017/10/11.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

class About extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>kunkkaliu</Text>
                <Text style={styles.text}>QQ: 742732824</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 16,
        lineHeight: 30,
        fontWeight: "700",
        color: '#555'
    }
});

export default About;