import  React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class StopWatch extends Component {


    constructor(props){
        super(props);

        this.state = {
            min: 0,
            sec: 0,
            msec: 0
        }

        this.lapArr = [];

        this.interval = null;
    }

handleToggle = () => {
        this.setState(
            {
                start: !this.state.start
            },
            () => this.handleStart()
        );
    };

    handleLap = (min, sec, msec) => {
        this.lapArr = [
            ...this.lapArr,
            {min, sec, msec}
        ]

    };

    handleStart = () => {
        if (this.state.start) {
            this.interval = setInterval(() => {
                if (this.state.msec !== 99) {
                    this.setState({
                        msec: this.state.msec + 1
                    });
                } else if (this.state.sec !== 59) {
                    this.setState({
                        msec: 0,
                        sec: ++this.state.sec
                    });
                } else {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: ++this.state.min
                    });
                }
            }, 1);

        } else {
            clearInterval(this.interval);
        }
    };

    handleReset = () => {
        this.setState({
            min: 0,
            sec: 0,
            msec: 0,

            start: false
        });

        clearInterval(this.interval);

        this.lapArr = [];
    };

    render() {
        let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
        return(
            <View style={styles.container}>
            <View style={styles.circle}>
                <Text style={styles.child}>{padToTwo(this.state.min) + ' : '}</Text>
                <Text style={styles.child}>{padToTwo(this.state.sec) + ' : '}</Text>
                <Text style={styles.child}>{padToTwo(this.state.msec)}</Text>
            </View>
 
            <View style={styles.buttonParent}>
                    <TouchableOpacity style={styles.buttonReset} onPress={this.handleReset}><Text style={[styles.buttonText, {color: 'white'}]}>Reset</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStart} onPress={this.handleToggle}><Text style={styles.buttonText}>{!this.state.start? 'Start': 'Stop'}</Text></TouchableOpacity>
                </View>
        </View>
            
        );
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222831',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        marginTop: height/10,
        height: width/1.5, 
        width: width/1.5, 
        borderRadius: width/1.5,
        borderWidth: 2,
        borderColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },

    child: {
        fontSize: width/12,
        color: '#DDDDDD',
        fontWeight: 'bold'
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "12%",
    },

    buttonStart: {
        height: width/6.5,
        width: width/6.5,
        backgroundColor: '#E7F6F2',
        borderRadius: width/7,
        justifyContent: 'center',
        alignItems: 'center',
      },
        buttonReset: {
        height: width/6.5,
        width: width/6.5,
        backgroundColor: '#395B64',
        borderRadius: width/7,
        marginRight: width/10,
        justifyContent: 'center',
        alignItems: 'center'
      },
    buttonText: {
        fontSize: width/22,
        alignSelf: "center"
    }
});


module.exports = StopWatch;