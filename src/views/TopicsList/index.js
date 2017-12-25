/**
 * Created by liudonghui on 2017/10/11.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    View,
    Text,
    RefreshControl,
    FlatList,
    ActivityIndicator
} from 'react-native';
import TopicItem from '../../components/TopicItem';
import TopicDetail from '../TopicDetail';
import {getTopics} from '../../actions/topics';

const topicType = 'recent';
const topicPages = 20;

class TopicsList extends React.PureComponent {
    state = {
        isRefreshing: false
    }

    goTo = (id) => {
        this.props.navigator.push({
            component: TopicDetail,
            title: '详情',
            passProps: {
                id: id
            }
        });
    }

    listFooterComponent = () => {
        const {pagination} = this.props;
        if(pagination.pageIndex + 1 > topicPages) {
            return (
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>～我也是有底线的～</Text>
                </View>
            )
        }
        return (
            <View style={styles.bottomView}>
                <ActivityIndicator color="#888"/>
                <Text style={styles.loadingMore}>正在加载</Text>
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <TopicItem onPressItem={this.goTo} topic={item}/>
        )
    }

    keyExtractor = (item, index) => {
        return item.id;
    }

    onEndReached = () => {
        const {pagination, getTopics, loading} = this.props;
        if(!loading && pagination.pageIndex + 1 <= topicPages) {
            getTopics({
                type: topicType,
                pageIndex: pagination.pageIndex + 1,
                limit: pagination.pageSize
            });
        }
    }

    onRefresh = async () => {
        const {pagination, getTopics, loading} = this.props;
        if(loading) {
            return;
        }
        this.setState({
            isRefreshing: true
        });
        let res = await getTopics({
            type: topicType,
            pageIndex: 0,
            limit: pagination.pageSize
        }).payload.promise;
        if(res && res.payload && res.payload.data) {
            this.setState({
                isRefreshing: false
            });
        }
    }

    getItemLayout = (data, index) => {
        return {length: 81, offset: 81 * index, index};
    }

    componentDidMount() {
        const {pagination, getTopics} = this.props;
        getTopics({
            type: topicType,
            pageIndex: 0,
            limit: pagination.pageSize
        });
    }

    render() {
        const {topics} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    initialNumToRender={10}
                    data={topics}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    ListFooterComponent={this.listFooterComponent()}
                    getItemLayout={this.getItemLayout}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            tintColor="#888"
                        />
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center'
    },
    bottomText: {
        color: '#888'
    },
    loadingMore: {
        color: '#888',
        marginLeft: 5,
        marginVertical: 5
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.topics.loading,
        pagination: state.topics.pagination,
        topics: state.topics.topics
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopics: bindActionCreators(getTopics, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);