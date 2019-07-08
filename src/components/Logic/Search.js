import React from 'react';
import '~/utils/bible';

class SearchProvider extends React.PureComponent {
	state = {};

	search = () => {};

	render() {
		const search = this.search;
		const result = this.state;
		return this.props.children(search, result);
	}
}

export default SearchProvider;
