import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import ToDoScreen from '../screens/ToDoScreen';
import InProgressScreen from '../screens/InProgressScreen';
import DoneScreen from '../screens/DoneScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'ToDo';

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="ToDo"
				component={ToDoScreen}
				options={{
					title: 'To Do',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-square-outline" />,
				}}
			/>
			<BottomTab.Screen
				name="InProgress"
				component={InProgressScreen}
				options={{
					title: 'In Progress',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-square" />,
				}}
			/>
			<BottomTab.Screen
				name="Done"
				component={DoneScreen}
				options={{
					title: 'Done',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-checkbox" />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

	switch (routeName) {
		case 'ToDo':
			return 'To Do';
		case 'InProgress':
			return 'In Progress';
		case 'Done':
			return 'Done';
	}
}
