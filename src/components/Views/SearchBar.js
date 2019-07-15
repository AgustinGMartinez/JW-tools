import React from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';

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
					{/* <Button onPress={reset} transparent> */}
					<Icon name="md-close" onPress={reset} />
					{/* </Button> */}
				</Item>
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
