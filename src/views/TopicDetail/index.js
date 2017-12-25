/**
 * Created by liudonghui on 2017/10/11.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    View,
    WebView,
    ScrollView,
    Text
} from 'react-native';
import {getTopicDetail} from '../../actions/topics';

class TopicDetail extends React.PureComponent {
    componentDidMount() {
        const {id, getTopicDetail} = this.props;
        getTopicDetail({
            id: id
        });
    }

    render() {
        const {topicDetail} = this.props;
        return (
            <WebView
                automaticallyAdjustContentInsets={false}
                scalesPageToFit={false}
                style={styles.container}
                contentInset={{top: 200, left: 0, right: 0, bottom: 200}}
                source={{
                        html: `<head>
                                   <link rel="stylesheet" href="https://ruby-china.org/assets/front-e978d636fcfd9e39098633917935b80f668bbb57b23f216d914e9c0d73751f46.css"/>
                                   <style>
                                       body {
                                            background-color: #fff;
                                       }
                                       .markdown {
                                           padding: 0 15px;
                                       }
                                   </style>
                               </head>
                               <div class="markdown">
                                   ${topicDetail.body_html || ""}
                               </div>`
                    }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
});

const mapStateToProps = (state) => {
    return {
        topicDetail: state.topics.topicDetail
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopicDetail: bindActionCreators(getTopicDetail, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);