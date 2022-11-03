import React from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'
import WebViewScreen from './src/Screens/WebViewScreen';
import SplashScreen from 'react-native-splash-screen'

export const storage = new MMKV()


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    }
  }

  componentDidMount() {
    const url = storage.getString('path')
    if (url === undefined | url === "") {
      remoteConfig()
        .setDefaults({
          url: undefined
        })
        .then(() => remoteConfig().fetchAndActivate())
        .then(_fetchedRemotely => {
          const url = remoteConfig().getValue('url');
          if (url._value !== "") {
            this.setState({ url: url._value });
            storage.set('path', url._value)
            SplashScreen.hide();
          } else {
            SplashScreen.hide();
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
      <Provider store={store} >
          <WebViewScreen data={this.state.url} />
      </Provider>
    )
  };
}


export default App;
