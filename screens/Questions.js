import react,{useState,useContext,useEffect} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import React  from 'react'
import { Text, View } from 'react-native'
import Colors from "../components/Colors";

const Questions=()=>{
    const {theme}=useContext(ThemeContext)
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);

    return(
        <View style={{...Styles.body,alignItems:"center"}}>
            <Text style={{color:activeColor.fontColor}}>
                coming soon!
            </Text>


        </View>
    )
}
export default Questions;
