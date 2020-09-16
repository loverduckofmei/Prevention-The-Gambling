import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button"; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';

// ※ git push 되지 않을때 
// 1. git add . 
// 2. git commit -m "msg";
// 3. git push origin master; 

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

const Stack = createStackNavigator();
export default function App(){
   return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomePage" component={HomeScreen}/>
        <Stack.Screen name="DiceGame" component={DiceScreen}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
        <Stack.Screen name="TrueWin" component={TrueWinnerScreen}/>
        <Stack.Screen name="Manipulate" component={ManipulateScreen}/>
        <Stack.Screen name="StopGamble" component={StopGambleScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
   );
 }

function HomeScreen({ navigation: { navigate } }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>The Gambling Prevention App</Text>
      <View style={{flexDirection: 'row', margin: 20}}>
       <Button
         onPress={() =>
           navigate('DiceGame')
         }
         title="Play The Roll The Dice"
       />
       <Button
         onPress={() =>
           navigate('TrueWin')
         }
         title="I Won't Play Gambling"
       />
      </View>
    </View>
  );
}

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
    navigate('Manipulate',{
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

function ManipulateScreen({route, navigation }){
  const {val,redDice,blackDice} = route.params;
  const [va,SetVa] = useState(redDice);
  const [vb,SetVb] = useState(blackDice);
  const choiceOdd = "플레이어는 홀수를 골랐습니다.";
  const choiceEven = "플레이어는 짝수를 골랐습니다.";
  return(
    <View style={styles.container}>
      <Text>[운영자 화면]</Text>
      <View style={styles.row}>
         <Image style={styles.img} source={RedDice[redDice]} />
         <Image style={styles.img} source={BlackDice[blackDice]} />
      </View>
      <Text>{JSON.stringify(val) != 0 ? choiceEven : choiceOdd}</Text>
      <Text>RedDice의 값은 {JSON.stringify(redDice)}입니다.</Text>
      <Text>BlackDice의 값은 {JSON.stringify(blackDice)}입니다.</Text>
      <View>
        <Text>RedDice의 값 바꾸기</Text>
        <RNPickerSelect
          placeholder={{
            label: 'No Change',
            value: ''
          }}
          onValueChange={(va) => {
            SetVa(va);
          }}
          items ={[
            { label: '1', value: 1},
            { label: '2', value: 2},
            { label: '3', value: 3},
            { label: '4', value: 4},
            { label: '5', value: 5},
            { label: '6', value: 6}
          ]}
        />
        <Text>BlackDice의 값 바꾸기</Text>
        <RNPickerSelect
          placeholder={{
            label: 'No Change',
            value: ''
          }}
          onValueChange={(vb) => {
            SetVb(vb);
          }}
          items ={[
            { label: '1', value: 1},
            { label: '2', value: 2},
            { label: '3', value: 3},
            { label: '4', value: 4},
            { label: '5', value: 5},
            { label: '6', value: 6}
          ]}
        />
      </View>
      <View>
        <Button
          title="Go To Result" 
          onPress={() => {
            navigation.navigate('Result',{
              va : va,
              vb : vb,
              BlackDice : blackDice,
              val : val
            }) 
          }}

        />
      </View>
    </View>
  );
};

function ResultScreen({route, navigation }){
  
  const {val,va,vb} = route.params;
  const add = Number(va) + Number(vb);
  const oddEven = (Number(va) + Number(vb)) % 2 ;

  const choiceOdd = "당신은 홀수를 골랐습니다.";
  const choiceEven = "당신은 짝수를 골랐습니다.";
  const odd = "주사위의 결과는 홀수 입니다.";
  const even = "주사위의 결과는 짝수 입니다.";
  const win = "당신이 이겼습니다.";
  const lose = "당신이 졌습니다.";
  return (
    <View style={styles.container}>
      <Text>[결과 화면]</Text>
      <View style={styles.row}>
         <Image style={styles.img} source={RedDice[va]} />
         <Image style={styles.img} source={BlackDice[vb]} />
      </View>
      <Text>주사위의 합은 {JSON.stringify(add)}입니다.</Text>
      <Text>{JSON.stringify(val) != 0 ? choiceEven : choiceOdd}</Text>
      <Text>{JSON.stringify(oddEven) == 0? even : odd}</Text>
      <Text>{JSON.stringify(val) != JSON.stringify(oddEven) ? win : lose} </Text>
      <Button title="Play This Game Again" onPress={() => navigation.navigate('DiceGame')}/>
      <Button title="Quit This Game" onPress={() => navigation.navigate('StopGamble')}/>
    </View>
  )
};

function StopGambleScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text>Gamble Always Be Unfair To You,</Text>
      <Text>You Must Be Realize Seriousness And Addiction Of The Gamble,</Text>
      <Text> And Stop Do That!!!</Text>
      <Button title="Go TO Home" onPress={() => navigation.navigate('HomePage') }/>
    </View>
  )
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