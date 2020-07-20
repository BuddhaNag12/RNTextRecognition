import React, { useState} from 'react';
import {Icon,Text,Card,Image} from 'react-native-elements';
import {View,ActivityIndicator,ScrollView,TouchableOpacity,Clipboard } from 'react-native';
// import {Clipboard} from '@react-native-community/clipboard'
let RNFS = require('react-native-fs');

export default function Profile({route,navigation}){
    let {uri} =route.params;
    let {imageText} =route.params;
    const [deleted,setDeleted]=useState(false);

    const copyToClipboard = () => {
        Clipboard.setString(imageText)
      }
    const saveFile=()=>{
        let path = uri;
       // console.log(path);
        RNFS.writeFile(path, 'images', 'utf8')
        .then((success) => {
            alert("File saved ",path);
            //console.log('FILE WRITTEN!');
        })
        .catch((err) => {
            alert("error",err);
           // console.log(err.message);
        });
    }
    const deleteFile=()=>{
        RNFS.unlink(uri)
        .then(() => {
            console.log('FILE DELETED');
            setDeleted(true)
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
            setDeleted(true)
            console.log(err.message);
        });
    }
      return(
        <ScrollView >
              {deleted ?
              <Text style={{textAlign:"center"}}>File Deleted</Text>
              :
                <Card >
                <Text style={{textAlign:"center", justifyContent:"center", alignContent:"center",paddingTop:10}}> Image</Text>
                <Image
                source={{uri}}
                style={{ width: 400, height: 400 }}
                PlaceholderContent={<ActivityIndicator />}
                />
                </Card>
            }
            <View style={{
            justifyContent:"space-around",
            padding:10,
            margin:15,
            alignItems:"center" ,
            alignContent:"center",
            flexDirection:"row",
            backgroundColor:"white"
            }}>
            {deleted ?
                 <Icon
                 name='long-arrow-left'
                 type='font-awesome'
                 color='#517fa4'
                 onPress={()=>navigation.navigate('Home')}
                 />
                 :
                <Icon
                name='remove'
                type='font-awesome'
                color='#517fa4'
                onPress={()=>deleteFile()}
                />
             }
            <Icon
            name='save'
            type='font-awesome'
            color='#517fa4'
            onPress={()=>saveFile()}
            />     
            </View>
            <Text h1 style={{paddingLeft:3,margin:2,textAlign:"center",color:'red',fontFamily:'Arial'}}>
                Text Recognised
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard()}>
            <Text style={{paddingLeft:3,margin:2,justifyContent:'center'}}>
                {imageText}
            </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
