import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const  WebViewScreen = (props) => {

    const webViewRef = useRef(null)
    const [canGoBack, setCanGoBack] = useState(false)

    const backAction = () => {
        console.log(canGoBack)
        if(canGoBack){
            webViewRef.current.goBack()
        }else{
            return true
        }
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        () => BackHandler.removeEventListener("hardwareBackPress", backAction)
    }, [canGoBack])


    return (
        <WebView
            ref={webViewRef}
            source={{ uri: props.data }}
            style={{ height: height, width: width }}
            allowsBackForwardNavigationGestures={true}
            onNavigationStateChange={navState => {
                setCanGoBack(navState.canGoBack)
            }}
        />
    )
}

export default WebViewScreen;