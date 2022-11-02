import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { useDispatch } from "react-redux";
import { clearProgramm } from '../redux/reducer'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function TreningProgramm(props) {
    const dispatch = useDispatch();
    const title = "Create your workout program";

    const onDelete = (workoutId) => {
        dispatch(clearProgramm(workoutId));
        // console.log(workoutId)
    }

    const Icon = () => {
        if (props.data.treningName === 'pull-up') {
            return (
                <Image style={styles.Icon} source={require('../img/pull-up-bar.png')} />
            )
        }
        else if (props.data.treningName === 'push-up') {
            return (
                <Image style={styles.Icon} source={require('../img/push-up.png')} />
            )
        }
        else {
            return (
                <Image style={styles.Icon} source={require('../img/weight-lifting.png')} />
            )
        }
    }
    return props.data.treningName === '' ? (

        <View>
            <ImageBackground blurRadius={15} style={styles.ImageBackground} source={require('../img/fitness1.jpg')}>
                <Text style={styles.treningCreateStyle}>{title}</Text>
            </ImageBackground>
        </View>

    ) : <View>
        <View blurRadius={15} style={styles.Background} source={require('../img/fitness1.jpg')}>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }} >
                <Text style={styles.treningNameStyle}>{props.data.treningName}</Text>
                <Image source={require('../img/calendar.png')} style={styles.calendar} />
                <Text style={styles.treningNameStyle}>{props.data.workoutDate}</Text>
            </View>
            <Icon />
            <View style={{ flexDirection: 'row' }} >
                <View style={{ left: width / 53, top: height / -60 }} >
                    <Text style={{ color: '#DDDDDD', fontSize: width / 27, }} >approaches: {props.data.workoutCount}</Text>
                    <Text style={{ color: '#DDDDDD', fontSize: width / 27, top: height / 50 }} >break: {props.data.workoutCount} min.</Text>
                </View>
                <TouchableOpacity onPress={() => onDelete(props.data.workoutId)} >
                    <Image source={require('../img/delete.png')} style={styles.delete} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
}



const styles = StyleSheet.create({
    ImageBackground: {
        height: height / 5,
        width: width,
        marginBottom: height / 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Background: {
        height: height / 5,
        width: width,
        marginBottom: height / 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22303C'
    },
    calendar: {
        height: width / 15,
        width: width / 15,
        top: height / -30,
        marginLeft: width / 10
    },
    treningNameStyle: {
        color: '#DDDDDD',
        fontSize: width / 24,
        top: height / -30,
        alignSelf: 'flex-start',
        marginLeft: width / 25
    },
    treningCreateStyle: {
        color: '#DDDDDD',
        fontSize: width / 20,
    },
    date: {
        color: '#DDDDDD',
        alignSelf: 'flex-end',
        fontSize: width / 28,
        marginRight: width / 20,
        top: height / 10

    },
    Icon: {
        height: width / 6,
        width: width / 6,
        position: 'absolute',
        left: width / 10,
        top: height / 14
    },
    delete: {
        height: width / 12,
        width: width / 12,
        left: width / 4,
        opacity: 0.5
    }
});


export default TreningProgramm;