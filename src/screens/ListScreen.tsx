/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',

      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    profileImg: {
      height: 80,
      width: 80,
      borderRadius: 40,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'white',
      alignSelf: 'center',
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
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
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
    },
    subtitle: {
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
    },
    textButton: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
    text: {
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
    },
    TextTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingVertical: 10,
      justifyContent: 'center',
    },
    customView: {
      width: '100%',
      height: 2,
      backgroundColor: 'black',
    },
    bodyText: {
      paddingVertical: 10,
      fontSize: 12,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
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

const ListScreen = ({navigation}: any) => {
  const styles = useStyles();
  const [flatListItems, setFlatListItems] = useState<any>([]);
  const image = {
    uri: 'https://i.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o',
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user ', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    );
  };

  let listItemView = item => {
    console.log('ItemImage:-', item.user_image);

    // if (
    //   typeof item.user_image == 'string' &&
    //   item.user_image != '[object Object]'
    // ) {
    //   img = JSON.parse(item.user_image);
    // }

    let img = item.user_image;

    return (
      <View key={item.user_id} style={{padding: 20}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details Page', {
              item: item,
            })
          }>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: img,
              }}
              style={styles.profileImg}
            />
            <View style={{flexDirection: 'column', padding: 15}}>
              <Text style={{color: 'white'}}>
                Name: {item.user_fname + ' ' + item.user_lname}
              </Text>
              <Text style={{color: 'white'}}>Email: {item.user_email}</Text>
              <Text style={{color: 'white'}}>Phone No: {item.user_phone}</Text>
              <Text style={{color: 'white'}}>Address: {item.user_address}</Text>
              <Text style={{color: 'white'}}>Gender: {item.user_gender}</Text>
              <Text style={{color: 'white'}}>
                Date of birth: {item.user_dob}
              </Text>
              <Text style={{color: 'white'}}>
                Education: {item.user_education}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ListScreen;
