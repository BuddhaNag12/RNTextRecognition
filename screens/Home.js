import React from 'react';
import {Button,Text,Card} from 'react-native-elements';
import {View} from 'react-native';



export default function Home({ navigation }){
    return(
        <View style={{flex:1,justifyContent:"center"}}>
            <Card containerStyle={{height:200}} >
            <Text style={{textAlign:"center", justifyContent:"center", alignContent:"center",paddingTop:20}}>Welcome to Cam Scanner</Text>
            <Button title="Open camera" onPress={()=>navigation.navigate('Camera')} />
            </Card>
        </View>
    )
}
