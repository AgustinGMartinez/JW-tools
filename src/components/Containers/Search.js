import React from 'react';
import bible from '../../utils/bible';
import SearchBar from '../Views/SearchBar';

class SearchBarContainer extends React.PureComponent {
	state = {
		searchResults: [],
	};

	onSearch = value => {
		this.setState({ searchResults: bible.search(value, undefined, 1) });
	};

	render() {
		return (
			<SearchBar search={this.onSearch} result={this.state.searchResults} />
		);
	}
}

export default SearchBarContainer;
