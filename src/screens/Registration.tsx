import React, {useState, useEffect, useRef} from 'react';

import {
  Alert,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  PermissionsAndroid,
  ImageBackground,
  Button,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import SizedBox from '../components/Sizebox';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from '../redux/actions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Keyboard from 'react-native-keyboard';
import {auth} from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {openDatabase} from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Asset, launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';

import {TextComponent} from '../components/TextComponent';

var db = openDatabase(
  {name: 'ListDatabase.db', location: 'default'},
  () => {},
  error => {
    console.log(error);
  },
);

const Registration = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const data = [
    {level: 'Post Graduate', value: '1'},
    {level: 'Graduate', value: '2'},
    {level: 'HSC/Diploma', value: '3'},
    {level: 'SSC', value: '4'},
  ];

  //console.log(route.params);
  // if (typeof route.params !== 'undefined') {
  //   const {firstName, registered} = route.params;

  //   console.log(firstName, registered);
  // }

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
  //const [filePath, setFilePath] = useState<any>({});
  const [photo, setPhoto] = useState<Asset | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(0);
  const [firstName, setFirstName] = useState<String>('');
  const [lastName, setLastName] = useState<String>('');

  const [emailUpdate, setEmailUpdate] = useState<String>('');
  const [phoneUpdate, setPhoneUpdate] = useState<String>('');
  const [checkedUpdate, setCheckedUpdate] = useState<String>('Male');
  const [valueUpdate, setValueUpdate] = useState<String>('');
  const [textUpdate, setTextUpdate] = useState<String>('');
  const [addressUpdate, setAddressUpdate] = useState<String>('');
  const [photoUpdate, setPhotoUpdate] = useState<Asset | null>(null);
  const ref_input = useRef();
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  const handleModal = () => setModalVisible(() => !modalVisible);

  const image = {
    uri: 'https://i.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o',
  };

  useEffect(() => {
    if (typeof route.params !== 'undefined') {
      const {
        img,
        firstName,
        lastName,
        emailUpdated,
        phoneUpdated,
        addressUpdated,
        genderUpdated,
        dobUpdate,
        educationUpdate,
        registered,
      } = route.params;
      console.log('Image:- ', img);
      setFirstName(firstName);
      setLastName(lastName);
      setEmailUpdate(emailUpdated);
      setAddressUpdate(addressUpdated);
      setCheckedUpdate(genderUpdated);
      setTextUpdate(dobUpdate);
      setValueUpdate(educationUpdate);
      setPhoneUpdate(phoneUpdated);
      setPhotoUpdate({
        uri: img.path,
      });

      if (registered == 1) {
        console.log('Value:- ', route.params.registered);
        setIsRegistered(1);
      } else {
        setIsRegistered(0);
      }
    }
  }, [route.params]);

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
    setFirstName(value);
    if (value.length === 0 && value.length <= 3) {
      setFNameValid(true);
    } else {
      setFNameValid(false);
    }
  };

  const handleLName = value => {
    setLName(value);
    setLastName(value);
    if (value.length === 0 && value.length <= 3) {
      setLNameValid(true);
    } else {
      setLNameValid(false);
    }
  };

  const handleNumber = value => {
    setPhone(value);
    setPhoneUpdate(value);
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
    setEmailUpdate(text);

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
      setTextUpdate(dateTimeString);
    } else {
      setText('');
      setTextUpdate('');
      Alert.alert('Date of birth should be less than current date');
    }

    hideDatePicker();
  };

  const handleAddress = value => {
    setAddress(value);
    setAddressUpdate(value);
    if (value.length === 0) {
      setAddressValid(true);
    } else {
      setAddressValid(false);
    }
  };

  const chooseFile = async () => {
    await ImagePicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        // console.log(image);
        //console.log(image.path);
        console.log('ImagePath:-', image.path);

        setPhoto({
          uri: image.path,
        });
        setPhotoUpdate({
          uri: image.path,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const choosePhotoFromCamera = async (): Promise<void> => {
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
            setPhotoUpdate(assets[0]!);
          } else {
            setPhoto(null);
            setPhotoUpdate(null);
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
    //console.log('Values:- ', data[1].label);
    let education = '';

    if (value == '1') {
      education = 'Post Graduate';
    } else if (value == '2') {
      education = 'Graduate';
    } else if (value == '3') {
      education = 'HSC/Diploma';
    } else if (value == '4') {
      education = 'SSC';
    }
    console.log('Edu:-', education);

    if (isRegistered == 1) {
      console.log('Updated Name:-', address);

      db.transaction(tx => {
        tx.executeSql(
          'UPDATE table_user set user_fname=?, user_lname=? ,user_phone=?,user_email=?, user_address=?,user_image=?,user_gender=?,user_dob=?,user_education=? ',
          [
            fname,
            lname,
            phone,
            email,
            address,
            photo?.uri,
            checked,
            text,
            education,
          ],
          (tx, results) => {
            console.log('Results:-', results.rowsAffected);
            if (results.rowsAffected > 0) {
              dispatch(actions.update(results));
              Alert.alert(
                'Success',
                'User updated successfully',
                [
                  {
                    text: 'Ok',

                    onPress: () => navigation.navigate('ListPage'),
                  },
                ],
                {cancelable: false},
              );
            } else {
              Alert.alert('Updated Failed');
            }
          },
        );
      });
    } else if (isRegistered == 0) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_fname, user_lname,user_phone ,user_email,user_address,user_image,user_gender,user_dob,user_education,user_register) VALUES (?,?,?,?,?,?,?,?,?,?)',
          [
            fname,
            lname,
            phone,
            email,
            address,
            photo?.uri,
            checked,
            text,
            education,
            1,
          ],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              dispatch(actions.insert(results));
              Alert.alert('Registration success');
              navigation.navigate('ListPage');
            } else {
              Alert.alert('Registration Failed');
            }
          },
        ),
          (error: any) => {
            console.log(JSON.stringify(error));
          };
      });
    }
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
      Alert.alert('Alert', 'First name can not be empty', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input.current.focus()},
      ]);
    } else if (fname.length < 3) {
      Alert.alert('Alert', 'First name must contain 3 characters', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input.current.focus()},
      ]);
    } else if (lname.length === 0) {
      Alert.alert('Alert', 'Last name can not be empty', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input1.current.focus()},
      ]);
    } else if (lname.length < 3) {
      Alert.alert('Alert', 'Last name must contain 3 characters', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input1.current.focus()},
      ]);
    } else if (phone.length === 0) {
      Alert.alert('Alert', 'Phone number must contain 10 digits', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input2.current.focus()},
      ]);
    } else if (phone.length < 10) {
      Alert.alert('Alert', 'Phone number must contain 10 digits', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input2.current.focus()},
      ]);
    } else if (email.length === 0) {
      Alert.alert('');
      Alert.alert('Alert', 'Email can not be empty', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input3.current.focus()},
      ]);
    } else if (pass.length === 0) {
      Alert.alert(
        'Alert',
        'Password should be min 8 characters and max 20 characters',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => ref_input4.current.focus()},
        ],
      );
    } else if (confirmpass !== pass) {
      Alert.alert('Alert', 'Password and confirm password should be same', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input5.current.focus()},
      ]);
    } else if (value.length === 0) {
      Alert.alert('You must choose Education');
    } else if (text.length === 0) {
      Alert.alert('Date of birth can not be empty');
    } else if (address.length === 0) {
      Alert.alert('Alert', 'Address can not be empty', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => ref_input6.current.focus()},
      ]);
    } else if (!checkPassowrd) {
      handleSignUp();
    } else {
      Alert.alert(checkPassowrd);
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeAreaView}>
            <View>
              <TextComponent text="First Name*" />

              <View style={styles.searchSection}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your First Name here"
                  value={isRegistered == 1 ? firstName : fname}
                  keyboardType="default"
                  onChangeText={handleFName}
                  underlineColor="transparent"
                  placeholderTextColor="white"
                  //onSubmitEditing={() => ref_input.current.focus()}
                  ref={ref_input}
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
                  value={isRegistered == 1 ? lastName : lname}
                  keyboardType="default"
                  onChangeText={handleLName}
                  underlineColor="transparent"
                  placeholderTextColor="white"
                  ref={ref_input1}
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
                  value={isRegistered == 1 ? phoneUpdate : phone}
                  onChangeText={handleNumber}
                  underlineColor="transparent"
                  placeholderTextColor="white"
                  ref={ref_input2}
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
                {route.params !== undefined ? (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={emailUpdate}
                    editable={false}
                    focusable={false}
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={handleCheckEmail}
                    placeholderTextColor="white"
                    ref={ref_input3}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={handleCheckEmail}
                    placeholderTextColor="white"
                    ref={ref_input3}
                  />
                )}
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
                  color="white"
                  status={checked === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('Male')}
                />
                <TextComponent text="Female*" />
                <RadioButton
                  value="Female"
                  color="white"
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
                  secureTextEntry={true}
                  onChangeText={handlePass}
                  placeholderTextColor="white"
                  ref={ref_input4}
                />
              </View>

              {passValid ? (
                <Text style={styles.textFailed}>
                  Password can't be too short
                </Text>
              ) : (
                <Text style={styles.textFailed}> </Text>
              )}

              <TextComponent text="Confirm Password*" />
              <View style={styles.searchSection}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  value={confirmpass}
                  secureTextEntry={true}
                  onChangeText={handleConfirmPass}
                  placeholderTextColor="white"
                  ref={ref_input5}
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
                labelField="level"
                valueField="value"
                placeholder="Select item"
                value={isRegistered == 1 ? valueUpdate : value}
                onChange={item => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="white"
                    name="Safety"
                    size={20}
                  />
                )}
              />
              <View style={{marginTop: 13}}>
                <TextComponent text="Date of birth*" />
              </View>

              <TouchableOpacity onPress={showDatePicker}>
                <View style={styles.searchSection}>
                  <Text style={styles.input}>
                    {isRegistered == 1 ? textUpdate : text}
                  </Text>
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
                  value={isRegistered == 1 ? addressUpdate : address}
                  underlineColorAndroid="transparent"
                  onChangeText={handleAddress}
                  underlineColor="transparent"
                  placeholderTextColor="white"
                  ref={ref_input6}
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
                  onPress={handleModal}>
                  <Text style={styles.textStyle}>Choose Image</Text>
                </TouchableOpacity>

                <Modal isVisible={modalVisible}>
                  <View style={styles.alignment}>
                    <View style={{width: '50%', height: 50, margin: 10}}>
                      <Button
                        title="Press to capture Image from Camera"
                        onPress={() => choosePhotoFromCamera()}
                      />
                    </View>

                    <View style={{width: '50%', height: 50, margin: 10}}>
                      <Button
                        title="Press to capture Image from Gallery"
                        onPress={() => chooseFile()}
                      />
                    </View>

                    <View style={{width: '50%', height: 50, margin: 10}}>
                      <Button
                        title="Cancel"
                        onPress={() => setModalVisible(false)}
                      />
                    </View>
                  </View>
                </Modal>

                {route.params !== undefined ? (
                  <Image
                    source={{uri: photoUpdate?.uri}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Image source={{uri: photo?.uri}} style={styles.imageStyle} />
                )}

                {/* <Text style={styles.textStyle}>{filePath.uri}</Text> */}
              </View>
            </View>

            <SizedBox height={10} />
            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>
                  {route.params !== undefined ? 'Update' : 'Submit'}
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </ImageBackground>
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
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    flex: 1,
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
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
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
    marginTop: 10,
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
    color: 'white',
    fontSize: 10,
  },
  input: {
    padding: 5,
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
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
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
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
    width: '30%',
    height: 60,
    alignContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
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
    justifyContent: 'center',
  },
});
