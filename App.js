import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import { MMKV } from 'react-native-mmkv';
import WebViewScreen from './src/Screens/WebViewScreen';
import SplashScreen from 'react-native-splash-screen'

export const storage = new MMKV()


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
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
     if(url._value !== ''){
        this.setState({ url: url._value});
          storage.set('path', url._value)
          SplashScreen.hide();
     }else{
      SplashScreen.hide();
      alert('Что-то пошло не так')
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

    return (
      <SafeAreaView style={styles.Container}>
<WebViewScreen data={this.state.url} />
      </SafeAreaView>
    );
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
