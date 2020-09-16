import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, StackNavigator } from 'react-navigation';
import FirstScreen from './FirstScreen';
import Loading from "./Loding";

const AppNavigator = createStackNavigator({
  FirstScreen: {screen : FirstScreen}
});

export default createAppContainer(AppNavigator);
 
