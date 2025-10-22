import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../screens/Auth/HomePageScreen';
import About from '../screens/Auth/AboutScreen';
import Register from '../screens/Auth/RegisterScreen';
import Login from '../screens/Auth/LoginScreen';
import Terms from '../screens/Auth/TermsScreen';
import { Ionicons } from '@expo/vector-icons';
import { PublicStackParamList } from '@/types/navigation';

const Drawer = createDrawerNavigator<PublicStackParamList>();

export default function PublicNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="HomePage"
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                    <Ionicons
                        name="menu"
                        size={26}
                        color="#000"
                        style={{ marginLeft: 12 }}
                        onPress={() => navigation.toggleDrawer()}
                    />
                ),
            })}
        >
            <Drawer.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    title: 'Home',
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="About"
                component={About}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="person-add-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="log-in-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="Terms"
                component={Terms}
                options={{
                    drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />,
                }}
            />
        </Drawer.Navigator>
    );
}
