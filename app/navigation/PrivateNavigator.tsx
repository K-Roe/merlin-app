import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/LoggedIn/DashboardScreen';
import { Ionicons } from '@expo/vector-icons';
import { PrivateDrawerParamList } from '@/types/navigation';

const Drawer = createDrawerNavigator<PrivateDrawerParamList>();

export default function PrivateNavigator() {
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
