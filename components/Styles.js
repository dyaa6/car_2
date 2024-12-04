import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import Colors from "./Colors";
import { Directions } from "react-native-gesture-handler";

const useThemeStyles=(theme)=>{
  let activeColor=Colors[theme.mode];
  return{
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            width:"100%",
            marginTop:-17
          },
          backgroundImageStyle:{
            flex:1,
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            alignItems:"center"
          },
          
          powerButton: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 130,
            height: 130,
            borderRadius: 90,
            backgroundColor: '#5F9EA0',
            marginVertical: 20,
            marginTop:100
          },
          runbutton: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 0,
          },
          buttonLoading: {
            borderWidth: 5,
            borderColor: '#2E8B57',
          },// switches
          switchContainer:{
            alignItems:"center",
            marginTop:20,
            marginBottom:20
          },
          switchOne:{
            transform: [{ scaleX: 4 }, { scaleY: 3.8 }],
            marginBottom:25,
            marginHorizontal:0,
            marginVertical:0,
          },
          switchTwo:{
            transform: [{ scaleX: 4 }, { scaleY: 3.8 }],
            marginHorizontal:0,
            marginVertical:0,
            marginVertical:33
          },

          
            runButtonText:{
              fontSize:25,
              color:"#fff",
              fontWeight:"bold"
            },

          //state container
          stateContainer:{
            width:"100%",
            alignItems:"center",
            margin:20,
            marginTop:37
          },
          stateLED:{
            width:70,
            height:70,
            backgroundColor:activeColor.darkColor,
            borderWidth:2,
            borderColor:"#000",
            borderRadius:40,
            margin:10
          },
          LEDs:{
          flexDirection:"row"
          },
          led1:{
            width:80,
            height:20,
            borderBottomRightRadius:15,
            borderLeftWidth:2
          },
          led3:{
            width:80,
            height:20,
            backgroundColor:activeColor.darkColor,
            borderTopLeftRadius:15,
          },
          ledOneOn:{
            backgroundColor:"red"
          },
          ledOneOff:{
            backgroundColor:Colors.darkColor
          },
          ledTwoOn:{
            backgroundColor:"orange"
          },
          ledTowOff:{
            backgroundColor:Colors.darkColor
          },
          ledThreeOn:{
            backgroundColor:"green"
          },
          ledThreeOff:{
            backgroundColor:Colors.darkColor
            },
          //lock container
          lockContainer:{
            flex:1,
            width:"100%",
            height:30,
            margin:0,
            flex:1,
            alignItems:"center",
          },
          row1:{
            width:"80%",
            justifyContent:"center",
            flexDirection:"row",
            margin:0,
            padding:0,
          },
          row2:{
            width:"80%",
            justifyContent:"center",
            flexDirection:"row",
            margin:0,
            padding:0
          },
          button: {
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            width: 120,
            height: 66,
            borderRadius: 0,
            backgroundColor: activeColor.mainColor,
            margin:0.5,
            padding:0
          },
          lockBtn:{
            borderTopLeftRadius:40
          },
          glassBtn:{
            borderBottomRightRadius:40
          },
          // tempretaure
          tempContainer:{
            position:"absolute",
            bottom:0
          },
          tempText:{
            fontSize:30,
            color:activeColor.mainColor,
            fontWeight:"bold"
          },
          powerBtn:{
            shadowColor: '#000',    
            shadowOffset: {
              width: 0,
              height: 15,
            },
            shadowOpacity: 0.54,
            shadowRadius: 12.27,
            transition: 'all 1s',
            width:140,
            height:140,  
          },
          //error message
          errContaner:{
            width:"80%",
            height:50,
            backgroundColor:activeColor.secondColor,
            borderWidth:2,
            borderRadius:15,
            borderColor:"red",
            alignItems:"center",
            justifyContent:"center",
            position:"absolute",
            bottom:50,
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 14,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 12,
          
          },
          errmsg:{
            color:'red',
            backgroundColor:activeColor.secondColor,
            fontWeight:"bold"
          },
          loginFieldContainer:{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            padding: 5,
            paddingLeft:10,
            borderColor: activeColor.mainColor,
            borderWidth: 1,
            borderRadius: 18,
            marginVertical:10,
            paddingRight:15
          },
          textboxtext:{
            color:activeColor.fontColor,
            textAlign:"right",
            fontSize:18
          },
          pannel:{
            width:"95%",
            alignItems:"flex-end",
            padding:15,
            borderRadius:15,
            margin:10,
            flexDirection:"column",
            justifyContent:"space-between",
            paddingHorizontal:20,    
            shadowColor: '#000',
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 10,
            
        },
        pannelFontMid:{
          fontSize:23,
          color:"#fff"
        },
        codeContainer:{
          width:"100%",
          flexDirection:"row-reverse",
          justifyContent:"space-between"
        },
        normalFont:{
          fontSize:18,
          color:"#fff",
        },
        resetButtonFont:{
          color:activeColor.mainColor,
          fontWeight:"bold",
        },
        resetButton:{
          backgroundColor:Colors.thirdColor,
          paddingVertical:5,
          borderRadius:15,
          paddingHorizontal:13,
        },
        messageText:{
          color:"red"
        },
        acsd:{
          width:"50%",
          position:"absolute",
          bottom:20
        },
        remoteTitle:{
          width:"100%",
          flexDirection:"row-reverse",
          justifyContent:"space-between"
        },
        rectangle:{
          width:60,
          height:50,
          backgroundColor:"red",
          margin:5,
          borderRadius:15
        },
        rectangleContainer:{
          flex:1,
          flexDirection:"row",
          flexWrap:"wrap",
          width:"100%",
          padding:10,
          justifyContent:"center"
        },
        tochable:{
          backgroundColor:activeColor.mainColor,
          width:"90%",
          alignItems:"center",
          padding:15,
          borderRadius:15,
          margin:10,
          flexDirection:"row-reverse",
          justifyContent:"space-between",
          paddingHorizontal:20
      },
      tochableColor:{
          fontSize:20,
          color:"#fff"
      },
      formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:activeColor.fontColor
      },
      inputContainer: {
        width: '100%',
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 10,
        textAlign:"right"
      },
      formButton: {
        backgroundColor: activeColor.mainColor,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
      },
      loadingLoginButton: {
        opacity: 0.6,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      body:{
        backgroundColor:activeColor.bgColor,
        marginTop:-20,
        paddingTop:40,
        flex:1
      },
      smalSwitch:{
        transform: [{ scaleX: 1.5 }, { scaleY:1.5 }],
            marginBottom:7,
            marginHorizontal:0,
            marginVertical:10,
      },
      greenAlert:{
        color:"green",
        width:"85%",
        margin:20,
        textAlign:"justify",
        fontSize:16.5,
        direction:"rtl",
        textIndent:"50px"
      },
      danger:{
        color:"red",
        width:"85%",
        marginHorizontal:20,
        textAlign:"justify",
        fontSize:16.5,
        direction:"rtl",
      }
    }
  }

export default useThemeStyles;