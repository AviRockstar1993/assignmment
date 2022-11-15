/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
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
      backgroundColor: 'orange',
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

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
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
          height: 1,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  let listItemView = item => {
    console.log('Item:-', item.user_image);
    let img;
    // if (
    //   typeof item.user_image == 'string' &&
    //   item.user_image != '[object Object]'
    // ) {
    //   img = JSON.parse(item.user_image);
    // }

    img = JSON.parse(item.user_image);

    return (
      <View key={item.user_id} style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: img.uri,
            }}
            style={styles.profileImg}
          />
          <View style={{flexDirection: 'column', padding: 15}}>
            <Text>Name: {item.user_fname + ' ' + item.user_lname}</Text>
            <Text>Email: {item.user_email}</Text>
            <Text>Address: {item.user_address}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        />
      </SafeAreaView>
    </View>
  );
};

export default ListScreen;
