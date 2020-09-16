import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button"; 

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
const choice = [
  {label: "홀수", value: 0},
  {label: "짝수", value: 1}
];
export default function App(){
  const [redDice, setRedDice] = useState("1");
  const [blackDice, setBlackDice] = useState("6");
  const add = Number(redDice) + Number(blackDice);
  const oddEven = (Number(redDice) + Number(blackDice)) % 2 ;
  const a = "업";

  function rollDice() {
    const redDice = Math.floor((Math.random()) * 6 +1); // 1~6 random
    const blackDice = Math.floor((Math.random()) * 6 +1); // 1~6 random
    setRedDice(redDice);
    setBlackDice(blackDice);
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
          onPress ={(value) =>{}}
        >

        </RadioForm>
      </View>
      <TouchableOpacity onPress={rollDice}>
        <View style={styles.pushBtn}>
          <Text style={{color: "snow"}} >ROLL THE DICE</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text>두 주사위의 합은 {add}입니다.</Text>
        <Text>{oddEven == 1 ? '홀수 입니다' : '짝수 입니다'}</Text>
      </View>
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