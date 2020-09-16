import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button"; 
// import MainPage from "./MainPage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//function HomeScreen({ navigation: { navigate } }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>This is the home screen of the app</Text>
//       <Button
//         onPress={() =>
//           navigate('Profile', { names: ['Brent', 'Satya', 'Michaś'] })
//         }
//         title="Go to Brent's profile"
//       />
//     </View>
//   );
// }
// 
// function ProfileScreen({ navigation, route }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile Screen</Text>
//       <Text>Friends: </Text>
//       <Text>{route.params.names[0]}</Text>
//       <Text>{route.params.names[1]}</Text>
//       <Text>{route.params.names[2]}</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }
// 
// const Stack = createStackNavigator();
// 
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


const BlackDice = {
  1: require("./img/b1.png"),
  2: require("./img/b2.png"),
  3: require("./img/b3.png"),
  4: require("./img/b4.png"),
  5: require("./img/b5.png"),
  6: require("./img/b6.png")
}
const RedDice = {
  1: require("./img/r1.png"),
  2: require("./img/r2.png"),
  3: require("./img/r3.png"),
  4: require("./img/r4.png"),
  5: require("./img/r5.png"),
  6: require("./img/r6.png")
}

function DiceScreen({navigation: { navigate }}){
  const choice = [
    {label: "홀수", value: 0},
    {label: "짝수", value: 1}
  ];
  const [value,setValue] = useState(0);
  const [redDice, setRedDice] = useState("1");
  const [blackDice, setBlackDice] = useState("6");
  const add = Number(redDice) + Number(blackDice);
  const oddEven = (Number(redDice) + Number(blackDice)) % 2 ;
  function rollDice() {
    const redDice = Math.floor((Math.random()) * 6 +1); // 1~6 random
    const blackDice = Math.floor((Math.random()) * 6 +1); // 1~6 random
    setRedDice(redDice);
    setBlackDice(blackDice);
    navigate('Result',{
      add : add,
      val : value,
      oddEven : oddEven,
      redDice : redDice,
      blackDice : blackDice
    });
  }
  return(
     <View style={styles.container}>
       <Text>[플레이어 화면]</Text>
       <View style={styles.row}>
         <Image style={styles.img} source={RedDice[redDice]} />
         <Image style={styles.img} source={BlackDice[blackDice]} />
       </View>
       <View>
         <RadioForm
           formHorizontal={true}
           labelHorizontal={false}
           radio_props={choice}
           initial ={0}
           buttonColor= {'green'}
           selectedButtonColor={'green'}
           disabled={false}
           onPress ={(val) =>{
             setValue(val);
           }}
         >
         </RadioForm>
       </View>
       <TouchableOpacity onPress={rollDice}>
         <View style={styles.pushBtn}>
           <Text style={{color: "snow"}} >ROLL THE DICE</Text>
         </View>
       </TouchableOpacity>
     </View>
  );
};

function ResultScreen({route, navigation }){
  
  const {val,redDice,blackDice} = route.params;
  const add = Number(redDice) + Number(blackDice);
  const oddEven = (Number(redDice) + Number(blackDice)) % 2 ;

  
  const choiceOdd = "당신은 홀수를 골랐습니다.";
  const odd = "주사위의 결과는 홀수 입니다.";
  const choiceEven = "당신은 짝수를 골랐습니다.";
  const even = "주사위의 결과는 짝수 입니다.";
  const win = "당신이 이겼습니다.";
  const lose = "당신이 졌습니다.";
  return (
    <View style={styles.container}>
      <Text>[결과 화면]</Text>
      <View style={styles.row}>
         <Image style={styles.img} source={RedDice[redDice]} />
         <Image style={styles.img} source={BlackDice[blackDice]} />
      </View>
      <Text>주사위의 합은 {JSON.stringify(add)}입니다.</Text>
      <Text>{JSON.stringify(val) != 0 ? choiceEven : choiceOdd}</Text>
      <Text>{JSON.stringify(oddEven) == 0? even : odd}</Text>
      <Text>{JSON.stringify(val) != JSON.stringify(oddEven) ? win : lose} </Text>
      <Button title="Play The Game Again" onPress={() => navigation.goBack()}/>
    </View>
  )
};

function HomeScreen({ navigation: { navigate } }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>This is the home screen of the app</Text>
       <View style={{flexDirection: 'row', margin: 20}}>
        <Button
          onPress={() =>
            navigate('DiceGame')
          }
          title="Play The Roll The Dice"
        />
        <Button
          onPress={() =>
            navigate('TrueWin', { names: ['Brent', 'Satya', 'Michaś'] })
          }
          title="I Won't Play Gambling"
        />
       </View>
     </View>
   );
}

function TrueWinnerScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Congratulations!!!</Text>
      <Text>You're True Winner!!!</Text>
      <Button title="Go TO Home" onPress={() => navigation.navigate('HomePage') }/>
    </View>
  );
}
// const Stack = createStackNavigator();
// 
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
const Stack = createStackNavigator();
export default function App(){
   return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomePage" component={HomeScreen}/>
        <Stack.Screen name="DiceGame" component={DiceScreen}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
        <Stack.Screen name="TrueWin" component={TrueWinnerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
   );
 }

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent: "center",
    alignItems: "center"
  },
  img : {
    width: 120,
    height: 120,
    margin: 13
  },
  row : {
    flexDirection: "row"
  },
  pushBtn : {
    backgroundColor: "#F39C12",
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8
  }
 
}); 