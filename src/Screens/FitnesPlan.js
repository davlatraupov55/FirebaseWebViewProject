import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, LayoutAnimation, Keyboard, TouchableOpacity, Image, Dimensions, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import TreningProgramm from '../Components/TreningList';
import shortid from "shortid";
import { Picker } from '@react-native-picker/picker';
import { setProgramm } from '../redux/reducer';
import DateTimePicker from '@react-native-community/datetimepicker';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function FitnesPlan() {
    console.log('FitnesPlan is started')
    const trening = useSelector((state) => state.programm)
    const [WorkoutProgramm, setWorkoutProgramm] = useState(trening.programm);

    useEffect(() => {
        setWorkoutProgramm(trening.programm)
        Keyboard.dismiss()
    })

    const [animatedTopTo, setAnimatedTopTo] = useState(height / 1);
    const [animatedOpacityTo, setAnimatedOpacityTo] = useState(1);
    const [variant, setVariant] = useState('push-up');
    const [workoutDate, setWorkoutDate] = useState(JSON.stringify(new Date()).slice(1, 11));
    const [workoutbreak, setWorkoutbreak] = useState('2 min.');
    const [approaches, setApproaches] = useState('1');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const onSubmit = () => {
        const SendProgramm = {
            workoutId: shortid.generate(),
            treningName: variant,
            workoutDate: workoutDate,
            workoutCount: approaches,
            workoutBreak: workoutbreak,
        }
        dispatch(setProgramm(SendProgramm));
        Create(' ')
    }

    const Create = (name) => {
        LayoutAnimation.easeInEaseOut();
        if (name === '') {
            setAnimatedOpacityTo(1)
            setAnimatedTopTo(height / 10)
        } else {
            setAnimatedOpacityTo(0)
            setAnimatedTopTo(height / 1)
            setWorkoutDate(JSON.stringify(new Date()).slice(1, 11))
            setWorkoutbreak('')
            setApproaches('')

        }
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setWorkoutDate(JSON.stringify(currentDate).slice(1, 11));
        setShow(false)

    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: height - height / 20, width: width }} >
                <Text style={styles.titleText} >Welcome back!</Text>
                <TouchableOpacity onPress={() => navigation.navigate('StopWatch')} style={{ position: 'absolute', top: height / 30, right: width / 40 }} >
                    <Image style={styles.stopwatchIcon} source={require('../img/stopwatch.png')} />
                </TouchableOpacity>
                <ScrollView style={{ marginTop: height / 10 }} >
                    {WorkoutProgramm.map(item => (
                        <TouchableOpacity onPress={() => Create(item.treningName)} key={shortid.generate()}>
                            <TreningProgramm data={item} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>



                <View style={[styles.wrap, { top: animatedTopTo, opacity: animatedOpacityTo }]} >

                    <Text style={styles.wrapTitle} >Create workout</Text>
                    <TouchableOpacity style={{ position: 'absolute', top: height / 50, right: width / 50 }} onPress={() => Create(' ')} >
                        <Image style={{ height: width / 15, width: width / 15 }} source={require('../img/ignorIcon.png')} />
                    </TouchableOpacity>

                    <Picker
                        style={{ height: height / 10, width: width / 1.2 }}
                        selectedValue={variant}
                        onValueChange={(itemValue) =>
                            setVariant(itemValue)
                        } >
                        <Picker.Item label="push-up" value="push-up" />
                        <Picker.Item label="pull-up" value="pull-up" />
                        <Picker.Item label="weight-lifting" value="weight-lifting" />
                    </Picker>




                    <TextInput ke onFocus={() => showDatepicker()} value={workoutDate} placeholder={'training date'} style={styles.textInput} />
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={new Date()}
                            mode={mode}
                            is24Hour={true}
                            display='calendar'
                            onChange={onChange}
                        />
                    )}


                    <Picker
                        style={{ height: height / 10, width: width / 1.2 }}
                        selectedValue={workoutbreak}
                        onValueChange={(itemValue) =>
                            setWorkoutbreak(itemValue)
                        } >
                        <Picker.Item label="2 min." value="2" />
                        <Picker.Item label="3 min." value="3" />
                        <Picker.Item label="4 min." value="4" />
                        <Picker.Item label="5 min." value="5" />
                        <Picker.Item label="6 min." value="6" />
                        <Picker.Item label="7 min." value="7" />
                    </Picker>

                    <Picker
                        style={{ height: height / 10, width: width / 1.2 }}
                        selectedValue={approaches}
                        onValueChange={(itemValue) =>
                            setApproaches(itemValue)
                        } >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>

                    <TouchableOpacity onPress={() => onSubmit()} style={styles.submit} >

                        <Text style={styles.submitText} >Save workout</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>

    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222831',
        flex: 1,
        height: height,
        width: width
    },
    stopwatchIcon: {
        height: width / 13,
        width: width / 13,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width / 18,
        position: 'absolute',
        top: height / 30,
        left: width / 30
    },
    wrap: {
        height: height / 1.15,
        width: width,
        borderRadius: width / 80,
        backgroundColor: '#DDDDDD',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',

    },
    wrapTitle: {
        color: '#222831',
        fontSize: width / 20,
        fontWeight: '600',
        marginBottom: height / 15
    },
    textInput: {
        height: height / 10,
        width: width / 1.2,
        color: '#222831',
        fontSize: width / 22,
        marginLeft: width / 15
    },
    submit: {
        height: height / 10,
        width: width / 1.2,
        backgroundColor: '#222831',
        borderRadius: width / 50,
        marginTop: height / 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        color: '#DDDDDD',
        fontSize: width / 20
    }
});


export default FitnesPlan;