import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Headers';
import { Status } from './types.ds';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

type Colors = "#F7DC6F" | "#A2D9CE" | "#D7BDE2" ;

//const color_fondo: Colors[]=['#A2D9CE','#D7BDE2','#F7DC6F'];
const color_map = new Map<Status,Colors>([["POMO",'#A2D9CE'],["BREAK",'#D7BDE2'],["SHORT",'#F7DC6F']])

export default function App() {
  const [isWorking,setIsWorking] = useState(false)
  const [time,setTime] = useState<number>(25*60)
  const [currentTime,setCurrentTime] = useState<Status>("POMO")
  const [isActive,setIsActive] = useState(false)


  useEffect(() => {
    let interval: unknown = null;

    if (isActive){
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000)
    }else{
      clearInterval(interval as number);
    }

    if ( time == 0){
      setIsActive(false);
      setIsWorking((prev)=>!prev);
      setTime(isWorking ? 300 : 1500)
    }
    return () => clearInterval(interval as number)
  },[isActive, time])

  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive)
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/lighter-zippo-click.mp3")
    )
    await sound.playAsync();
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color_map.get(currentTime)}]}>
      <View style={{flex:1,paddingHorizontal:15,paddingTop: 30}}> {/* Platform.OS === "android" && */}
        <Text style={styles.text}>Pomodoro</Text>
        <Header time={time} currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime}></Header>
        <Timer time={time}/>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={{color: "white", fontWeight: "bold"}}>{isActive? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold"
  },
  button:{
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  }
});
