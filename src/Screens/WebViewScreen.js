import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, BackHandler, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview';
import Navigator from '../navigation/Navigator';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const WebViewScreen = (props) => {

    const webViewRef = useRef(null)
    const [canGoBack, setCanGoBack] = useState(false)

    const backAction = () => {
        return canGoBack ? webViewRef.current.goBack() : true
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, [canGoBack])

    return props.data !== "" ? (
        <View style={styles.Container}>
        <WebView
            ref={webViewRef}
            source={{ uri: props.data }}
            style={{ height: height, width: width }}
            allowsBackForwardNavigationGestures={true}
            onNavigationStateChange={navState => {
                setCanGoBack(navState.canGoBack)
            }}
        />
        </View>
 ) : (
    <Navigator />
    )

}

const styles = StyleSheet.create({
    Container: {
      backgroundColor: '#222831',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
  });

export default WebViewScreen;