import React from 'react';
import bible from '../../utils/bible';
import SearchBar from '../Views/SearchBar';
import SearchResult from '../Views/SearchResult';
import SearchResultInfo from '../Views/SearchResultInfo';
import { Content, Container, Spinner, Text } from 'native-base';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { withMenuButton, pushView } from '../../utils/navigation';

class SearchBarContainer extends React.PureComponent {
	state = {
		searchValue: '',
		searchResults: { results: [], total: 0 },
		loading: false,
		touched: false,
	};
	currentSearchTimeout = null;

	onSearch = value => {
		clearTimeout(this.currentSearchTimeout);
		this.setState({ loading: true, touched: value !== '', searchValue: value });
		this.currentSearchTimeout = setTimeout(() => {
			this.setState({
				searchResults: bible.search(value, undefined, 10000),
				loading: false,
			});
		}, 1000);
	};

	openInBible = (id, readble) => {
		const props = {
			id: id,
		};
		pushView({
			screenId: 'jw-tools.ChapterView',
			title: readble.split(':')[0],
			passProps: props,
			componentId: this.props.componentId,
		});
	};

	resetInput = () => {
		this.setState({ searchValue: '', touched: false });
	};

	render() {
		const searchValue = this.state.searchValue;
		const results = this.state.searchResults.results;
		const total = this.state.searchResults.total;
		const loading = this.state.loading;
		const touched = this.state.touched;

		return (
			<Container>
				<SearchBar
					search={this.onSearch}
					reset={this.resetInput}
					value={searchValue}
				/>
				<Content
					contentContainerStyle={!loading && results.length ? [] : s.content}
				>
					{loading ? (
						<Spinner color={'#5B3C88'} />
					) : results.length ? (
						<>
							<SearchResultInfo total={total} />
							<FlatList
								data={results}
								renderItem={item => (
									<SearchResult result={item.item} open={this.openInBible} />
								)}
								keyExtractor={result => result.map}
								// ListFooterComponent={<Spinner color={'#5B3C88'} />}
							/>
						</>
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

export default withMenuButton(SearchBarContainer);
