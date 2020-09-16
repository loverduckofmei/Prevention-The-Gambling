import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MainPage(props){
    const choiceOdd = "당신은 홀수를 골랐습니다.";
    const odd = "주사위의 결과는 홀수 입니다.";
    const choiceEven = "당신은 짝수를 골랐습니다.";
    const even = "주사위의 결과는 짝수 입니다.";
    const win = "당신이 이겼습니다.";
    const lose = "당신이 졌습니다.";
    return(
        <View>
            <Text>주사위의 합은 {props.add}입니다.</Text>
            <Text>{!props.val == 0 ? choiceEven : choiceOdd}</Text>
            <Text>{props.oddEven == 0? even : odd}</Text>
            <Text>{!props.val == props.oddEven ? win : lose} </Text>
        </View>
    );
}