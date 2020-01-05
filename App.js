import React from 'react';
import { View, StatusBar } from 'react-native'

import AppSwitchNavigator from './components/Navigation'

export default class App extends React.Component {

	render() {
		return (
			<View style={{ flex: 1 }}>
				<StatusBar barStyle="light-content" />
				<AppSwitchNavigator />
			</View>
		);
	}
}