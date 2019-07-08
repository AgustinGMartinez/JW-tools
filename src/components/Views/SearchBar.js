import React from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

class SearchBar extends React.PureComponent {
	render() {
		const search = this.props.search;
		return (
			<Header searchBar rounded style={s.header}>
				<Item>
					<Icon name="md-search" />
					<Input placeholder="Buscar" onChangeText={search} />
				</Item>
				<Button transparent>
					<Text>Buscar</Text>
				</Button>
			</Header>
		);
	}
}

const s = StyleSheet.create({
	header: {
		backgroundColor: '#5B3C88',
	},
});

export default SearchBar;
