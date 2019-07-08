import React from 'react';
import {
	Container,
	Header,
	Item,
	Input,
	Icon,
	Button,
	Text,
	Content,
	Radio,
	ListItem,
	Left,
	Right,
} from 'native-base';
import { StyleSheet } from 'react-native';

class SearchBar extends React.PureComponent {
	render() {
		const results = this.props.result;
		const search = this.props.search;
		return (
			<>
				<Container>
					<Header searchBar rounded style={s.header}>
						<Item>
							<Icon name="md-search" />
							<Input placeholder="Buscar" onChangeText={search} />
						</Item>
						<Button transparent>
							<Text>Buscar</Text>
						</Button>
					</Header>
					<Content>
						<Text>{results[0] && results[0].value}</Text>
					</Content>
				</Container>
			</>
		);
	}
}

const s = StyleSheet.create({
	header: {
		backgroundColor: '#5B3C88',
	},
});

export default SearchBar;
