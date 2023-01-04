import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants';
import moment from 'moment';
import WeatherCurrent from '../components/WeatherCurrent';
import WeatherCoordinates from '../components/WeatherCoordinates';

const formateDate = (date: Date) => {
  const today = date.getDate();
  const month = `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]}`

  return `${month} ${today < 10 ? '0':''}${today}, ${date.getFullYear()}`

}

const HomeScreen = () => {

  // const now = new Date();
  const now = moment(new Date());

  return <LinearGradient colors={[Colors.LIGHT_GREY,Colors.DARKER_GREY]} testID="home-screen"style={styles.container}>
    <View style={styles.title} >
      <Text style={styles.date} >{now.format('MMM DD, YYYY')}</Text>
      <Text style={styles.day} >{now.format('dddd')}</Text>
    </View>
    <WeatherCurrent/>
    <Text testID='home-screen-divider'  style={styles.divider} >or</Text>
    <WeatherCoordinates/>
  </LinearGradient>
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:40,
    alignContent:'space-between',
    justifyContent:'space-evenly'
  },
  title: {
    justifyContent:'flex-end'
  },
  date: {
    color: Colors.GREY,
    fontSize:13
  },
  day: {
    color: Colors.WHITE,
    fontSize:21
  },
  divider:{
    color: Colors.WHITE,
    textAlign:'center'
  }
})
export default HomeScreen;
