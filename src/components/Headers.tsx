import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from "react-native"
import { Status } from '../../types.ds';

type Props = {
    time: number,
    currentTime: Status,
    setCurrentTime: (value: Status) => void,
    setTime: (value: number) => void,
}

interface OptionsInterface {
    title: string,
    status: Status
}
const options: OptionsInterface[] = [{
    title: "Pomodoro",
    status: 'POMO'
},{
    title: "Short Break",
    status: 'SHORT'
},{
    title: "Long break",
    status: 'BREAK'
}];

function Header({time , currentTime, setCurrentTime, setTime}: Props) {
    
    const handlePress = (status: Status) =>{
        const newTime = status === 'POMO' ? 25 : status === 'SHORT' ? 5 : 15;
        setCurrentTime(status);
        setTime(newTime*60)
    }

    return (
    <View style={{flexDirection: "row"}}>
        {
            options.map((item,index) =>(
                <TouchableOpacity 
                    key={index} 
                    onPress={()=>handlePress(item.status)}
                    style={[Styles.itemStyle, 
                            currentTime !== item.status && {borderColor: "transparent"}
                        ]}
                    >
                    <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                </TouchableOpacity>
            ))
        }
    </View>
  )
}

const Styles = StyleSheet.create({
    itemStyle:{
        width: "33%",
        borderWidth: 3,
        padding:5,
        borderColor: "white",
        marginVertical: 20,
        alignItems: "center",
        borderRadius: 2,
    }
})

export default Header