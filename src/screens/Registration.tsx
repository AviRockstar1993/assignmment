import React, {useState} from 'react';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import SizedBox from '../components/Sizebox';

import {TextInput} from 'react-native-paper';
import {auth} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Registration = ({navigation}: any) => {
  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [pass, setPass] = useState<String>('');
  const [confirmpass, setConfirmPass] = useState<String>('');
  const [nameValid, setNameValid] = useState<Boolean>(false);
  const [emailValid, setEmailValid] = useState<Boolean>(false);
  const [passValid, setPassValid] = useState<Boolean>(false);
  const [confirmValid, setConfirmValid] = useState<Boolean>(false);

  function checkPasswordValidity(value: string): any {
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
  }

  const handleName = (value: any) => {
    setName(value);
    if (value.length === 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (text.length === 0) {
      setEmailValid(false);
    } else if (re.test(text) || regex.test(text)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const handlePass = (value: any) => {
    setPass(value);
    if (value.length === 0) {
      setPassValid(true);
    } else if (value.length < 8 || value.length > 20) {
      setPassValid(true);
    } else {
      setPassValid(false);
    }
  };

  const handleConfirmPass: any = (value: any) => {
    setConfirmPass(value);
    if (value.length === 0) {
      setConfirmValid(true);
    } else {
      setConfirmValid(false);
    }
  };

  const handleSignUp: any = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user);
        Alert.alert('Registered, please login');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    const checkPassowrd = checkPasswordValidity(pass);
    if (name.length === 0) {
      Alert.alert('Name can not be empty');
    } else if (email.length === 0) {
      Alert.alert('Email can not be empty');
    } else if (pass.length === 0) {
      Alert.alert('Password should be min 8 characters and max 20 characters');
    } else if (pass !== confirmpass) {
      Alert.alert('Password and confirm password should be same');
    } else if (!checkPassowrd) {
      handleSignUp();
    } else {
      Alert.alert(checkPassowrd);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <View>
              <TextInput
                style={{marginTop: 10}}
                label="Name"
                value={name}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={handleName}
              />
              {nameValid ? (
                <Text style={styles.textFailed}>Name can't be empty</Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}

              <TextInput
                style={{marginTop: 10}}
                label="Email"
                value={email}
                autoCapitalize="none"
                mode="outlined"
                onChangeText={handleCheckEmail}
              />
              {emailValid ? (
                <Text style={styles.textFailed}>Wrong format email</Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}
              <TextInput
                style={{marginTop: 10}}
                label="Password"
                value={pass}
                mode="outlined"
                onChangeText={handlePass}
              />
              {passValid ? (
                <Text style={styles.textFailed}>
                  Password can't be too short
                </Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}

              <TextInput
                style={{marginTop: 10}}
                label="Confirm Password"
                value={confirmpass}
                mode="outlined"
                onChangeText={handleConfirmPass}
              />
              {confirmValid ? (
                <Text style={styles.textFailed}>
                  Confirm password can't be matched
                </Text>
              ) : (
                <Text style={styles.textFailed} />
              )}
            </View>

            <SizedBox height={20} />
            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Register</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Registration;

const styles = StyleSheet.create({
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
    backgroundColor: 'orange',
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
