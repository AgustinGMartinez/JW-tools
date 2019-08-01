import React from 'react';
import { Header, Item, Input, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../utils/constants';

class SearchBar extends React.PureComponent {
	render() {
		const search = this.props.search;
		const reset = this.props.reset;
		const value = this.props.value;

		return (
			<Header searchBar rounded style={s.header}>
				<Item>
					<Icon name="md-search" />
					<Input placeholder="Buscar" value={value} onChangeText={search} />
					{value.trim().length > 0 && <Icon name="md-close" onPress={reset} />}
				</Item>
			</Header>
		);
	}
}

const s = StyleSheet.create({
	header: {
		backgroundColor: MAIN_COLOR,
	},
});

export default SearchBar;
