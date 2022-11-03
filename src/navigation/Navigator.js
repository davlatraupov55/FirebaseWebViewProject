import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FitnesPlan from "../Screens/FitnesPlan"
import StopWatch from "../Screens/StopWatch"


const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FitnesPlan" >
        <Stack.Screen name="FitnesPlan" component={FitnesPlan} options={{headerShown: false}}/>
        <Stack.Screen name="StopWatch" component={StopWatch}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;