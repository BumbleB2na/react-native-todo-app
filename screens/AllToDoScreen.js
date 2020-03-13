import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import uuid from 'uuid/v1';
import Input from '../components/Input';
import List from '../components/List';

export default class AllToDoScreen extends React.Component {
	state = {
		inputValue: '',
		loadingItems: false,
		allItems: {},
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
		try {
			const allItems = await AsyncStorage.getItem('ToDos');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
			});
		} catch (err) {
			console.log(err);
		}
	};
	onDoneAddItem = () => {
		const { inputValue } = this.state;
		if (inputValue !== '') {
			this.setState(prevState => {
				const id = uuid();
				const newItemObject = {
					[id]: {
						id,
						isCompleted: false,
						text: inputValue,
						createdAt: Date.now()
					}
	};
				const newState = {
					...prevState,
					inputValue: '',
					allItems: {
						...prevState.allItems,
						...newItemObject
					}
				};
				this.saveItems(newState.allItems);
				return { ...newState };
			});
		}
	};
	deleteItem = id => {
		this.setState(prevState => {
			const allItems = prevState.allItems;
			delete allItems[id];
			const newState = {
				...prevState,
				...allItems
	};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};
	completeItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: true
					}
				}
	};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};
	incompleteItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: false
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};
	deleteAllItems = async () => {
		try {
			await AsyncStorage.removeItem('ToDos');
			this.setState({ allItems: {} });
		} catch (err) {
			console.log(err);
		}
	};
	saveItems = newItem => {
		const saveItem = AsyncStorage.setItem('ToDos', JSON.stringify(newItem));
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
