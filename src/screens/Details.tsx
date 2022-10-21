/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {User} from '../components/User';
import {ActivityIndicator} from 'react-native-paper';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase';

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
      backgroundColor: 'orange',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
      justifyContent: 'center',
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
      paddingBottom: 5,
      paddingVertical: 5,
    },
    customView: {
      backgroundColor: 'black',
      width: '100%',
      height: 2,
    },
    textStyleTitle: {
      paddingBottom: 5,
      paddingVertical: 10,
    },
    textStyleBody: {
      paddingBottom: 5,
      paddingVertical: 10,
      paddingHorizontal: 5,
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
  });
}

const Details = ({route, navigation}: any) => {
  const styles = useStyles();
  const {id} = route.params;

  const [details, setDetails] = useState<User[]>([]);
  const [loader, setLoader] = useState<Boolean>(true);

  const getDetail = async () => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    setLoader(false);
    const result = await resp.json();
    console.log('Details:-', result);
    setDetails(result);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const signOutNow = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loader) {
    return <ActivityIndicator animating={true} color="blue" />;
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.alignment}>
          <Text style={styles.textStyleId}>{details.id}</Text>
          <View style={styles.customView}></View>
          <Text style={styles.textStyleTitle}>{details.title}</Text>
          <View style={styles.customView}></View>
          <Text style={styles.textStyleBody}>{details.body}</Text>
        </View>
        <TouchableOpacity onPress={signOutNow}>
          <View style={styles.signOutView}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Details;
