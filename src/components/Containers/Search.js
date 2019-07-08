import React from 'react';
import bible from '../../utils/bible';
import SearchBar from '../Views/SearchBar';
import SearchResult from '../Views/SearchResult';
import { Content, Container } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { Image, StyleSheet, View, Dimensions } from 'react-native';

class SearchBarContainer extends React.PureComponent {
	state = {
		searchResults: [],
	};

	onSearch = value => {
		this.setState({ searchResults: bible.search(value) });
	};

	openInBible = (id, readble) => {
		Navigation.push(this.props.componentId, {
			component: {
				name: 'jw-tools.BibleView',
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

	render() {
		const results = this.state.searchResults;
		console.log(results && results.length);
		return (
			<Container>
				<SearchBar search={this.onSearch} />
				<Content>
					{results && results.length
						? results.map(result => {
								return (
									<SearchResult
										result={result}
										key={result.map}
										open={this.openInBible}
									/>
								);
						  })
						: null}
					<View style={s.imageContainer}>
						<Image
							source={require('../../assets/libro.jpg')}
							style={[s.bookImage]}
						/>
					</View>
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	imageContainer: {
		display: 'flex',
		height: Dimensions.get('window').height - 150,
		width: '100%',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	bookImage: {
		opacity: 0.1,
		width: 200,
		height: 200,
	},
});

export default SearchBarContainer;
