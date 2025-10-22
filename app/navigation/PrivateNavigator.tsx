import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/LoggedIn/DashboardScreen';
import AssessmentScreen from '../screens/LoggedIn/AssessmentScreen';
import { Ionicons } from '@expo/vector-icons';
import { PrivateDrawerParamList } from '@/types/navigation';

const Drawer = createDrawerNavigator<PrivateDrawerParamList>();
const Stack = createStackNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
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
                drawerType: 'slide',
                swipeEnabled: true,
            })}
        >
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="speedometer-outline" color={color} size={size} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default function PrivateNavigator() {
    return (
        <Stack.Navigator>
            {/* Main drawer (only Dashboard shows here) */}
            <Stack.Screen
                name="MainDrawer"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />

            {/* Hidden screen — NOT in drawer menu */}
            <Stack.Screen
                name="Assessment"
                component={AssessmentScreen}
                options={{
                    headerShown: true,
                    title: 'Assessment',
                }}
            />
        </Stack.Navigator>
    );
}
