import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StackNavigatorParamList } from '../../types';
import Home from '../screens/Home';
import Login from '../screens/Login';
function AppNavigation({ isLoggedIn }: { isLoggedIn: boolean }) {
    const Stack = createNativeStackNavigator<StackNavigatorParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ?
                    <Stack.Group>
                        <Stack.Screen name="home" component={Home} options={{
                            headerShown: false
                        }} />
                    </Stack.Group>
                    :
                    <Stack.Group>
                        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                    </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;