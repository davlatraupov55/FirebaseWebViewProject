import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'
import WebViewScreen from './src/Screens/WebViewScreen';
import SplashScreen from 'react-native-splash-screen'
import Navigator from './src/navigation/TabNavigator';

export const storage = new MMKV()


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      plug: false
    }
  }

  componentDidMount() {
    const url = storage.getString('path')
    if (url === undefined | url === '') {
      remoteConfig()
        .setDefaults({
          url: undefined
        })
        .then(() => remoteConfig().fetchAndActivate())
        .then(_fetchedRemotely => {
          const url = remoteConfig().getValue('url');
          if (url._value !== '') {
            this.setState({ url: url._value });
            storage.set('path', url._value)
            SplashScreen.hide();
          } else {
            SplashScreen.hide();
            this.setState({ plug: true })
          }
        });
    }
    else {
      this.setState({
        url: url,
      })
      SplashScreen.hide();
    }
  }

  render() {

    return this.state.plug ? (
      <Provider store={store} >
        <Navigator />
      </Provider>
    ) : (
      <SafeAreaView style={styles.Container}>
        <WebViewScreen data={this.state.url} />
      </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#222831',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});


export default App;
