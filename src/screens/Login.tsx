import React, {useState, useEffect} from 'react';

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
import {signInWithEmailAndPassword} from 'firebase/auth';
import {openDatabase} from 'react-native-sqlite-storage';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 40,
      margin: 10,
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
      paddingTop: 5,
      paddingBottom: 10,
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
      marginTop: 10,
      justifyContent: 'center',
    },
    alignment: {
      flex: 1,
      justifyContent: 'center',
      margin: 10,
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

var db = openDatabase(
  {name: 'ListDatabase.db'},
  () => {},
  error => {
    console.log(error);
  },
);
const Login: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState<String>('');
  const [pass, setPass] = useState<String>('');
  const [seePassword, setSeePassword] = useState<Boolean>(false);
  const [checkValidEmail, setCheckValidEmail] = useState<Boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<Boolean>(true);

  const styles = useStyles();

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_fname VARCHAR(20), user_lname VARCHAR(20), user_phone VARCHAR(255), user_email VARCHAR(255), user_address VARCHAR(255),user_image VARCHAR(255),user_gender VARCHAR(255),user_dob VARCHAR(255),user_education VARCHAR(255),user_register VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const siginIn: any = () => {
    try {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userDetails: any) => {
          console.log(userDetails);
          Alert.alert('Email matched');
          navigation.navigate('Home Page');
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Email not matched');
        });
    } catch (error) {
      alert(error);
    }
  };

  const onSubmit: any = () => {
    const checkPassowrd = checkPasswordValidity(pass);
    if (email.length === 0) {
      Alert.alert('email can not be empty');
    } else {
      if (!checkPassowrd) {
        siginIn();
      } else {
        Alert.alert(checkPassowrd);
      }
    }
  };

  const checkPasswordValidity: any = (value: any) => {
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
    } else {
      setSeePassword(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.alignment}>
            <TextInput
              style={{marginTop: 10}}
              label="Email"
              value={email}
              autoCapitalize="none"
              mode="outlined"
              onChangeText={handleCheckEmail}
            />
            {checkValidEmail ? (
              <Text style={styles.textFailed}>Wrong format email</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}
            <TextInput
              style={{marginTop: 10}}
              label="Password"
              value={pass}
              secureTextEntry={passwordVisible}
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              mode="outlined"
              onChangeText={handlePass}
            
            {seePassword ? (
              <Text style={styles.textFailed}>Password can't be too short</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}
          </View>

          <SizedBox height={10} />
          <TouchableOpacity onPress={onSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Log in</Text>
            </View>
          </TouchableOpacity>
          <SizedBox height={16} />
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.buttonTitle}>New User? Register Here</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
