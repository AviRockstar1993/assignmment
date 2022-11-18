import React, {useState, useEffect} from 'react';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  TextInput,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SizedBox from '../components/Sizebox';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {auth} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {openDatabase} from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Asset, launchCamera} from 'react-native-image-picker';
import {TextComponent} from '../components/TextComponent';

var db = openDatabase(
  {name: 'ListDatabase.db'},
  () => {},
  error => {
    console.log(error);
  },
);
const Registration = ({navigation}: any) => {
  const data = [
    {label: 'Post Graduate', value: '1'},
    {label: 'Graduate', value: '2'},
    {label: 'HSC/Diploma', value: '3'},
    {label: 'SSC', value: '4'},
  ];
  const [fname, setFName] = useState<String>('');
  const [lname, setLName] = useState<String>('');
  const [phone, setPhone] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [pass, setPass] = useState<String>('');
  const [checked, setChecked] = useState<String>('Male');
  const [confirmpass, setConfirmPass] = useState<String>('');
  const [fnameValid, setFNameValid] = useState<Boolean>(false);
  const [lnameValid, setLNameValid] = useState<Boolean>(false);
  const [phoneValid, setPhoneValid] = useState<Boolean>(false);
  const [emailValid, setEmailValid] = useState<Boolean>(false);
  const [passValid, setPassValid] = useState<Boolean>(false);
  const [confirmValid, setConfirmValid] = useState<Boolean>(false);
  const [value, setValue] = useState<String>('');
  const [show, setShow] = useState<Boolean>(false);
  const [text, setText] = useState<String>('');
  const [address, setAddress] = useState<String>('');
  const [addressValid, setAddressValid] = useState<Boolean>(false);
  const [filePath, setFilePath] = useState<any>({});
  const [photo, setPhoto] = useState<Asset | null>(null);

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

  const handleFName = value => {
    setFName(value);
    if (value.length === 0 && value.length <= 3) {
      setFNameValid(true);
    } else {
      setFNameValid(false);
    }
  };
  const handleLName = value => {
    setLName(value);
    if (value.length === 0 && value.length <= 3) {
      setLNameValid(true);
    } else {
      setLNameValid(false);
    }
  };

  const handleNumber = value => {
    setPhone(value);
    if (value.length === 0 && value.length <= 3) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  const handleCheckEmail = text => {
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

  const handlePass = value => {
    setPass(value);
    if (value.length === 0) {
      setPassValid(true);
    } else if (value.length < 8 || value.length > 20) {
      setPassValid(true);
    } else {
      setPassValid(false);
    }
  };

  const handleConfirmPass = value => {
    setConfirmPass(value);
    if (value.length === 0) {
      setConfirmValid(true);
    } else {
      setConfirmValid(false);
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = date => {
    let current = new Date();
    let todaysDate =
      current.getDate() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getFullYear();

    let dateTimeString =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    if (text !== todaysDate.toString()) {
      setText(dateTimeString);
    } else {
      setText('');
      Alert.alert('Date of birth should be less than current date');
    }

    hideDatePicker();
  };

  const handleAddress = value => {
    setAddress(value);
    if (value.length === 0) {
      setAddressValid(true);
    } else {
      setAddressValid(false);
    }
  };

  // const chooseFile = async () => {
  //   await ImagePicker.openCamera({
  //     cropping: true,
  //     width: 500,
  //     height: 500,
  //     cropperCircleOverlay: true,
  //     compressImageMaxWidth: 640,
  //     compressImageMaxHeight: 480,
  //     freeStyleCropEnabled: true,
  //   })
  //     .then(image => {
  //       console.log(image);
  //       console.log(image.path);
  //       console.log('ImagePath:-', image.filename);

  //       setFilePath({
  //         uri: image.path,
  //         // width: 40,
  //         // height: 40,
  //         // mime: image.mime,
  //         // filename: image.filename,
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const handleChoosePhoto = async (): Promise<void> => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    const grantedStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedStorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      launchCamera({mediaType: 'photo', includeBase64: true}, response => {
        if (response) {
          let {assets} = response;

          if (assets) {
            setPhoto(assets[0]!);
          } else {
            setPhoto(null);
          }
        }
      });
    }
  };

  const handleSignUp = () => {
    // createUserWithEmailAndPassword(auth, email, pass)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log(user);
    //     Alert.alert('Registered, please login');
    //     navigation.navigate('Login');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_fname, user_lname, user_email,user_address,user_image) VALUES (?,?,?,?,?)',
        [fname, lname, email, address, photo?.uri],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('Registration success');
            navigation.navigate('ListPage');
          } else {
            Alert.alert('Registration Failed');
          }
        },
      );
    });
  };

  const onSubmit = () => {
    const checkPassowrd = checkPasswordValidity(pass);
    let current = new Date();
    let todaysDate =
      current.getDate() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getFullYear();

    if (fname.length === 0) {
      Alert.alert('First name can not be empty');
    } else if (fname.length < 3) {
      Alert.alert('First name must contain 3 characters');
    } else if (lname.length === 0) {
      Alert.alert('Last name can not be empty');
    } else if (lname.length < 3) {
      Alert.alert('Last name must contain 3 characters');
    } else if (phone.length === 0) {
      Alert.alert('Phone number must contain 10 digits');
    } else if (phone.length < 10) {
      Alert.alert('Phone number must contain 10 digits');
    } else if (email.length === 0) {
      Alert.alert('Email can not be empty');
    } else if (pass.length === 0) {
      Alert.alert('Password should be min 8 characters and max 20 characters');
    } else if (confirmpass !== pass) {
      Alert.alert('Password and confirm password should be same');
    } else if (value.length === 0) {
      Alert.alert('You must choose Education');
    } else if (text.length === 0) {
      Alert.alert('Date of birth can not be empty');
    } else if (address.length === 0) {
      Alert.alert('Address can not be empty');
    } else if (!checkPassowrd) {
      handleSignUp();
    } else {
      Alert.alert(checkPassowrd);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'orange'}}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <View>
            <TextComponent text="First Name*" />

            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Enter your First Name here"
                value={fname}
                keyboardType="default"
                onChangeText={handleFName}
                underlineColor="transparent"
              />
            </View>
            {fnameValid ? (
              <Text style={styles.textFailed}>First name can't be empty</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}

            <TextComponent text="Last Name*" />
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Last Name here"
                value={lname}
                keyboardType="default"
                onChangeText={handleLName}
                underlineColor="transparent"
              />
            </View>
            {lnameValid ? (
              <Text style={styles.textFailed}>Last Name can't be empty</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}

            <TextComponent text="Phone Number*" />
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter your 10 digit mobile number"
                value={phone}
                onChangeText={handleNumber}
                underlineColor="transparent"
              />
            </View>
            {phoneValid ? (
              <Text style={styles.textFailed}>
                Phone number must contain 10 digits
              </Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}

            <TextComponent text="Email*" />
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={handleCheckEmail}
              />
            </View>

            {emailValid ? (
              <Text style={styles.textFailed}>Wrong format email</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}
            <TextComponent text="Gender*" />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextComponent text="Male*" />
              <RadioButton
                value="Male"
                status={checked === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Male')}
              />
              <TextComponent text="Female*" />
              <RadioButton
                value="Female"
                status={checked === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Female')}
              />
            </View>

            <TextComponent text="Password*" />

            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={handlePass}
              />
            </View>

            {passValid ? (
              <Text style={styles.textFailed}>Password can't be too short</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}

            <TextComponent text="Confirm Password*" />
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmpass}
                onChangeText={handleConfirmPass}
              />
            </View>

            {confirmValid ? (
              <Text style={styles.textFailed}>
                Confirm password can't be matched
              </Text>
            ) : (
              <Text style={styles.textFailed} />
            )}
            <TextComponent text="Education*" />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            <View style={{marginTop: 10}}>
              <TextComponent text="Date of birth*" />
            </View>

            <TouchableOpacity onPress={showDatePicker}>
              <View style={styles.searchSection}>
                <Text style={styles.input}>{text}</Text>
                <DateTimePickerModal
                  isVisible={show}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </TouchableOpacity>

            <TextComponent text="Address*" />

            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Please enter valid address"
                value={address}
                underlineColorAndroid="transparent"
                onChangeText={handleAddress}
                underlineColor="transparent"
              />
            </View>
            {addressValid ? (
              <Text style={styles.textFailed}>Address can not be empty</Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.buttonStyle}
                onPress={handleChoosePhoto}>
                <Text style={styles.textStyle}>Choose Image</Text>
              </TouchableOpacity>

              <Image source={{uri: photo?.uri}} style={styles.imageStyle} />
              {/* <Text style={styles.textStyle}>{filePath.uri}</Text> */}
            </View>
          </View>

          <SizedBox height={10} />
          <TouchableOpacity onPress={onSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Submit</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
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
    flex: 1,
    marginTop: 10,
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
  input: {
    padding: 10,
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 15,
    height: 40,
  },
  gender: {
    fontSize: 15,
    color: 'black',
    paddingLeft: 10,
  },
  dropdown: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  imageStyle: {
    width: '40%',
    height: 40,
    alignContent: 'center',
    marginTop: 10,
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
});
