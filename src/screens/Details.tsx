/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {User} from '../components/User';
import {ActivityIndicator} from 'react-native-paper';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase';
import SizedBox from '../components/Sizebox';

function useStyles() {
  return StyleSheet.create({
    button: {
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
      width: 100,
      alignItems: 'center',
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
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
      marginTop: 10,
      alignItems: 'center',
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
      justifyContent: 'center',
    },
    textStyleId: {
      paddingVertical: 5,
      color: 'white',
    },
    customView: {
      backgroundColor: 'black',
      width: '100%',
      height: 2,
    },
    textStyleTitle: {
      paddingVertical: 5,
      color: 'white',
    },
    textStyleBody: {
      paddingVertical: 5,
      color: 'white',
    },
    signOutView: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      width: 100,
      marginLeft: 140,
      backgroundColor: 'blue',
      borderRadius: 10,
    },
    signOutText: {
      color: 'white',
      fontSize: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImg: {
      height: 80,
      width: 80,
      borderRadius: 40,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'white',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
  });
}

const Details = ({route, navigation}: any) => {
  const styles = useStyles();
  const {item} = route.params;
  let img = item.user_image;
  let fName = item.user_fname;
  let lName = item.user_lname;
  let email = item.user_email;
  let address = item.user_address;

  const image = {
    uri: 'https://i.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o',
  };

  // const [details, setDetails] = useState<User[]>([]);
  // const [loader, setLoader] = useState<Boolean>(true);

  // const getDetail = async () => {
  //   const resp = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts/${id}`,
  //   );
  //   setLoader(false);
  //   const result = await resp.json();
  //   console.log('Details:-', result);
  //   setDetails(result);
  // };

  const navigateToEditScreen = (
    image,
    firstName,
    lastName,
    emailId,
    address,
  ) => {
    navigation.navigate('Registration', {
      img: image,
      fName: firstName,
      lName: lastName,
      email: emailId,
      address: address,
    });
  };

  useEffect(() => {
    // getDetail();
  }, []);

  // const signOutNow = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       navigation.replace('Login');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // if (loader) {
  //   return <ActivityIndicator animating={true} color="blue" />;
  // }

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableOpacity>
            <Image
              source={{
                uri: img,
              }}
              style={styles.profileImg}
            />

            <Text style={styles.textStyleId}>
              {item.user_fname + ' ' + item.user_lname}
            </Text>

            <Text style={styles.textStyleTitle}>{item.user_email}</Text>
            <Text style={{color: 'white'}}>{item.user_phone}</Text>
            <Text style={styles.textStyleBody}>{item.user_address}</Text>
            <Text style={styles.textStyleBody}>{item.user_gender}</Text>
            <Text style={styles.textStyleBody}>{item.user_dob}</Text>
            <Text style={styles.textStyleBody}>{item.user_education}</Text>

            <SizedBox height={20} />
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('Registration', {
                    type: 1,
                    img: item.user_image,
                    firstName: item.user_fname,
                    lastName: item.user_lname,
                    emailUpdated: item.user_email,
                    phoneUpdated: item.user_phone,
                    addressUpdated: item.user_address,
                    genderUpdated: item.user_gender,
                    dobUpdate: item.user_dob,
                    educationUpdate: item.education,
                    registered: item.user_register,
                  });
                }}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Update</Text>
                </View>
              </TouchableOpacity>
              <SizedBox height={10} width={20} />
              <TouchableOpacity>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity onPress={signOutNow}>
          <View style={styles.signOutView}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity> */}
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Details;
