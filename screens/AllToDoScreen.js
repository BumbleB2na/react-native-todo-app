import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

// import { AddToDo } from '../components/AddToDo';
// import { AddToDoButton } from '../components/AddToDoButton';
import Input from '../components/Input';

export default class AllToDoScreen extends React.Component {
	state = {
		inputValue: ''
	};
	newInputValue = value => {
		this.setState({
			inputValue: value
		});
	};

	render() {
		const { inputValue } = this.state;
		return (
			<View style={styles.container}>
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
					
					<View style={styles.getStartedContainer}>
						<DevelopmentModeNotice />
					</View>

					<View style={styles.inputContainer}>
						<Input inputValue={inputValue} onChangeText={this.newInputValue} />
					</View>

				</ScrollView>
			</View>
		);
	}
}

AllToDoScreen.navigationOptions = {
	header: null,
};

function DevelopmentModeNotice() {
	if (__DEV__) {
		const learnMoreButton = (
			<Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
				Learn more
			</Text>
		);

		return (
			<Text style={styles.developmentModeText}>
				Development mode is enabled: your app will be slower but you can use useful development tools. {learnMoreButton}
			</Text>
		);
	} else {
		return (
			<Text style={styles.developmentModeText}>
				You are not in development mode: your app will run at full speed.
			</Text>
		);
	}
}

function handleLearnMorePress() {
	WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},

	inputContainer: {
		marginTop: 40,
		paddingLeft: 15
	}
});
