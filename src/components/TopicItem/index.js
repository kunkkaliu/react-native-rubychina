/**
 * Created by liudonghui on 2017/10/11.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Format } from '../../utils';

class TopicItem extends React.PureComponent {
    onPress = () => {
        const {onPressItem, topic} = this.props;
        onPressItem(topic.id);
    }
    render() {
        const {topic} = this.props;
        return (
            <TouchableOpacity onPress={this.onPress} activeOpacity={1}>
                <View style={styles.list}>
                    <Image source={{
                        uri: `${topic.user.avatar_url}`
                    }} style={styles.list_avatar}/>
                    <View style={styles.list_info}>
                        <Text numberOfLines={1} style={styles.list_title}>
                            {topic.title}
                        </Text>
                        <Text numberOfLines={1} style={styles.list_desc}>
                            发布者:{(topic.user && topic.user.name) || '无名'} • 发布于:{Format.date(topic.created_at)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 15,
        paddingLeft: 80,
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff'
    },
    list_avatar: {
        position: 'absolute',
        left: 15,
        top: 15,
        height: 50,
        width: 50,
        borderRadius: 25
    },
    list_info: {
        height: 50
    },
    list_title: {
        marginBottom: 10,
        color: '#555',
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 20
    },
    list_desc:{
        color: '#777',
        fontSize: 14,
        lineHeight: 20
    }
});

export default TopicItem;