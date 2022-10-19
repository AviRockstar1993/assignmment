/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native';

import { User } from '../components/User';

function useStyles() {
    return StyleSheet.create({
        button: {
            alignItems: 'center',
            backgroundColor: 'rgb(93, 95, 222)',
            borderRadius: 8,
            height: 48,
            justifyContent: 'center',
        },
        buttonTitle: {
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 22,
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 32,
        },
        forgotPasswordContainer: {
            alignItems: 'flex-end',
        },
        form: {
            alignItems: 'center',
            backgroundColor: 'rgb(58, 58, 60)',
            borderRadius: 8,
            flexDirection: 'row',
            height: 48,
            paddingHorizontal: 16,
        },
        label: {
            color: 'rgba(235, 235, 245, 0.6)',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 20,
            width: 80,
        },
        root: {
            backgroundColor: '#000000',
            flex: 1,
        },
        safeAreaView: {
            flex: 1,
            justifyContent: 'center'
        },
        subtitle: {
            color: 'rgba(235, 235, 245, 0.6)',
            fontSize: 17,
            fontWeight: '400',
            lineHeight: 22,
        },
        textButton: {
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 20,
        },
        textInput: {
            color: '#FFFFFF',
            flex: 1,
        },
        title: {
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 34,
        },
        text: {
            color: 'white',
            fontWeight: '700',
        },
        textFailed: {
            alignSelf: 'flex-end',
            color: 'red',
        },
        alignment: {
            alignItems: 'center',
            fontSize: 18,
            borderRadius: 5,
            paddingVertical: 10,
            borderColor: 'black',
            borderWidth: 1,
            margin: 5,
            backgroundColor: 'white',
            justifyContent: 'center'

        }
    });
}

const Details = ({ route, navigation }) => {
    const styles = useStyles();
    const { id } = route.params;

    const [details, setDetails] = useState<User[]>([]);


    const getDetail = async () => {
        const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const result = await resp.json();
        console.log("Details:-", result);
        setDetails(result);

    };

    useEffect(() => {
        getDetail();
    }, []);



    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>

                <View style={styles.alignment}>
                    <Text style={{ paddingBottom: 5, paddingVertical: 5 }}>{details.id}</Text>
                    <View style={{ backgroundColor: 'black', width: '100%', height: 2 }}></View>
                    <Text style={{ paddingBottom: 5, paddingVertical: 10 }}>{details.title}</Text>
                    <View style={{ backgroundColor: 'black', width: '100%', height: 2 }}></View>
                    <Text style={{ paddingBottom: 5, paddingVertical: 10 }}>{details.body}</Text>
                </View>
            </SafeAreaView>
        </View>

    )
}

export default Details;