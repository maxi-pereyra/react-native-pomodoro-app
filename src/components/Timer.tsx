import React from 'react'
import { View, Text, StyleSheet,  } from 'react-native'

type Props = {
    time: number
}
function Timer({time}:Props) {
    const formatedTime = `${Math.floor(time/60).toString().padStart(2,"0")}:${(time%60).toString().padStart(2,"0")}`
    return (
    <View style={styles.container}>
        <Text style={styles.time}>{formatedTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 0.2,
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
        padding: 1,
        borderRadius: 15
    },
    time:{
        fontSize: 80,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default Timer