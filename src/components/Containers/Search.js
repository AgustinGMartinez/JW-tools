import React from 'react';
import bible from '../../utils/bible';
import SearchBar from '../Views/SearchBar';
import SearchResult from '../Views/SearchResult';
import { Content, Container, Spinner, Text } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { Image, StyleSheet, View, Dimensions, Keyboard } from 'react-native';

class SearchBarContainer extends React.PureComponent {
	state = {
		searchValue: '',
		searchResults: [],
		loading: false,
		touched: false,
	};
	currentSearchTimeout = null;

	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
	}

	componentWillUnmount() {
		if (this.navigationEventListener) {
			this.navigationEventListener.remove();
		}
	}

	navigationButtonPressed({ buttonId }) {
		if (buttonId !== 'sideMenuButton') {
			return;
		}
		Navigation.mergeOptions('drawerMenu', {
			sideMenu: {
				left: {
					visible: true,
				},
			},
		});
	}

	onSearch = value => {
		clearTimeout(this.currentSearchTimeout);
		this.setState({ loading: true, touched: value !== '', searchValue: value });
		this.currentSearchTimeout = setTimeout(() => {
			this.setState({
				searchResults: bible.search(value, undefined, 100),
				loading: false,
			});
		}, 1000);
	};

	openInBible = (id, readble) => {
		Keyboard.dismiss();
		Navigation.push(this.props.componentId, {
			component: {
				name: 'jw-tools.ChapterView',
				passProps: {
					id: id,
				},
				options: {
					topBar: {
						title: {
							text: readble.split(':')[0],
							color: 'white',
						},
						background: {
							color: '#5B3C88',
						},
						backButton: {
							color: 'white',
							visible: true,
						},
					},
				},
			},
		});
	};

	resetInput = () => {
		this.setState({ searchValue: '', touched: false });
	};

	render() {
		const searchValue = this.state.searchValue;
		const results = this.state.searchResults;
		const loading = this.state.loading;
		const touched = this.state.touched;

		return (
			<Container>
				<SearchBar
					search={this.onSearch}
					reset={this.resetInput}
					value={searchValue}
				/>
				<Content contentContainerStyle={results.length ? [] : s.content}>
					{loading ? (
						<Spinner color={'#5B3C88'} />
					) : results.length ? (
						results.map(result => {
							return (
								<SearchResult
									result={result}
									key={result.map}
									open={this.openInBible}
								/>
							);
						})
					) : touched ? (
						<Text style={s.noResults}>Sin resultados</Text>
					) : (
						<View style={s.imageContainer}>
							<Image
								source={require('../../assets/libro.jpg')}
								style={[s.bookImage]}
							/>
						</View>
					)}
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	bookImage: {
		opacity: 0.1,
		width: 200,
		height: 200,
	},
	noResults: {},
});

export default SearchBarContainer;
