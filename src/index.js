import React from 'react';
import {Provider} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';
import store from './store';
import TopicsList from './views/TopicsList';
import About from './views/About';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'topics'
        }
    }

    handlePress = (tab) => {
        this.setState({
            selectedTab: tab
        })
    }

    render() {
        return (
            <Provider store={store}>
                <TabBarIOS selectedTab={this.state.selectedTab}>
                    <TabBarIOS.Item selected={this.state.selectedTab === 'topics'}
                                    title="文章"
                                    name="topics"
                                    icon={require('./assets/icons/icon.png')}
                                    onPress={() => { this.handlePress('topics') }}
                    >
                        <NavigatorIOS style={styles.container}
                                      tintColor={'#333344'}
                                      titleTextColor={'#eb5424'}
                                      initialRoute={{
                                          component: TopicsList,
                                          title: '文章列表'
                                      }}
                                      itemWrapperStyle={styles.navigator}/>
                    </TabBarIOS.Item>

                    <TabBarIOS.Item selected={this.state.selectedTab === 'about'}
                                    title="关于"
                                    name="about"
                                    icon={require('./assets/icons/reactnative.png')}
                                    onPress={() => { this.handlePress('about') }}
                    >
                        <NavigatorIOS style={styles.container}
                                      tintColor={'#333344'}
                                      titleTextColor={'#eb5424'}
                                      initialRoute={{
                                          component: About,
                                          title: '关于我们'
                                      }}
                                      itemWrapperStyle={styles.navigator}/>
                    </TabBarIOS.Item>
                </TabBarIOS>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7EAEC'
    },
    navigator: {
        backgroundColor: '#ffffff'
    }
});

export default App;
