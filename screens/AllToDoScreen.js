import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

// import { AddToDo } from '../components/AddToDo';
// import { AddToDoButton } from '../components/AddToDoButton';
import Input from '../components/Input';
import List from '../components/List';

export default class AllToDoScreen extends React.Component {
	state = {
		inputValue: '',
		loadingItems: false,
		allItems: {
			232390: {
				id: 232390,  //same id as the object
				text: 'Mock item created yesterday that is completed',
				isCompleted: true,
				createdAt: new Date((new Date()).setDate((new Date()).getDate()-1))
			},
			232391: {
				id: 232391,
				text: 'Latest mock item added to list',
				isCompleted: false,
				createdAt: Date.now()
			}
		},
		isCompleted: false
	};
	componentDidMount = () => {
		this.loadingItems();
	};
	newInputValue = value => {
		this.setState({
			inputValue: value
		});
	};
	loadingItems = async () => {
	};
	onDoneAddItem = () => {
	};
	deleteItem = id => {
	};
	completeItem = id => {
	};
	incompleteItem = id => {
	};
	deleteAllItems = async () => {
	};
	saveItems = newItem => {
	};


	render() {
		const { inputValue, loadingItems, allItems } = this.state;
		return (
			<>
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
				<View style={styles.list}>
					<ScrollView contentContainerStyle={styles.scrollableList}>
						{Object.values(allItems)
							.reverse()
							.map(item => (
								<List
									key={item.id}
									{...item}
									deleteItem={this.deleteItem}
									completeItem={this.completeItem}
									incompleteItem={this.incompleteItem}
								/>
							))}
					</ScrollView>
				</View>
			</>
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
	},
	list: {
		flex: 1,
		marginTop: 70,
		paddingLeft: 15,
		marginBottom: 10
	},
	scrollableList: {
		marginTop: 15
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	deleteAllButton: {
		marginRight: 40
	}
});
