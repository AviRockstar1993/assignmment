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
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import axios from 'axios';
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
            paddingHorizontal: 10,
            borderColor: 'black',
            borderWidth: 1,
            margin: 5,
            backgroundColor: 'white'

        }
    });
}

const HomePage = () => {
    const styles = useStyles();

    const [data, setData] = useState<User[]>([])
    const renderItem = ({ item }: any) => (
        <View style={styles.alignment}>
            <Text>{item.title}</Text>
        </View>


    );

    const fetchData = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await resp.json();
        console.log(result);
        setData(result);

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <View style={styles.root}>
            <SafeAreaView style={styles.safeAreaView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}></KeyboardAvoidingView>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        </View>


    )
}

export default HomePage;
