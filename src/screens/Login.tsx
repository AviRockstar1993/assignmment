import React, { useState } from 'react';

import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import SizedBox from '../components/Sizebox';

import { TextInput } from 'react-native-paper';

interface FormData {
    email: string;
    password: string;
}

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
    });
}

const Login: React.FC = ({ navigation }: any) => {
    const [email, setEmail] = useState<String>('');
    const [pass, setPass] = useState<String>('');
    const [seePassword, setSeePassword] = useState<Boolean>(false);
    const [checkValidEmail, setCheckValidEmail] = useState<Boolean>(false);


    const styles = useStyles();

    const onSubmit = () => {
        const checkPassowrd = checkPasswordValidity(pass);
        if (email.length === 0) {
            Alert.alert('email can not be empty');
        }
        else {
            if (!checkPassowrd) {
                navigation.navigate('Home Page');
            } else {
                Alert.alert(checkPassowrd);
            }
        }

    }

    const checkPasswordValidity = (value: any) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return 'Password must not contain Whitespaces.';
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            return 'Password must have at least one Uppercase Character.';
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            return 'Password must have at least one Lowercase Character.';
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return 'Password must contain at least one Digit.';
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            return 'Password must be 8-16 Characters Long.';
        }

        return null;
    };

    const handleCheckEmail = (text: any) => {

        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setEmail(text);
        if (text.length === 0) {
            setCheckValidEmail(false);
        }
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };

    const handlePass = (value: any) => {
        setPass(value);
        if (value.length < 8) {
            setSeePassword(true);
        }
        else {
            setSeePassword(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.root}>
                <SafeAreaView style={styles.safeAreaView}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >


                        <View style={styles.alignment}>


                            <TextInput style={{ marginTop: 10 }}
                                label="Email"
                                value={email}
                                autoCapitalize='none'
                                mode='outlined'
                                onChangeText={handleCheckEmail}
                            />
                            {checkValidEmail ? (
                                <Text style={styles.textFailed}>Wrong format email</Text>
                            ) : (
                                <Text style={styles.textFailed}> </Text>
                            )}
                            <TextInput style={{ marginTop: 10 }}
                                label="Password"
                                value={pass}
                                mode='outlined'
                                onChangeText={handlePass}
                            />
                            {seePassword ? (
                                <Text style={styles.textFailed}>Password can't be too short</Text>
                            ) : (
                                <Text style={styles.textFailed}> </Text>
                            )}
                        </View>


                        <SizedBox height={20} />
                        <TouchableOpacity onPress={onSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonTitle}>Log in</Text>
                            </View>
                        </TouchableOpacity>
                        <SizedBox height={16} />
                        <TouchableOpacity onPress={() => navigation.navigate('Registration Page')}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.buttonTitle}>New User? Register Here</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;

const styles = StyleSheet.create({
    alignment: {
        height: '100%',
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: 'skyblue',
    },
});
