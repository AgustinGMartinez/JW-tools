import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Right,
	Switch,
	Button,
} from 'native-base';

class SideDrawer extends React.Component {
	render() {
		return (
			<Container>
				<Content>
					<List>
						<ListItem>
							<Text>Inicio</Text>
						</ListItem>
						<ListItem>
							<Text>Verdades</Text>
						</ListItem>
						<ListItem>
							<Text>Principios</Text>
						</ListItem>
						<ListItem>
							<Text>Lecciones</Text>
						</ListItem>
						<ListItem>
							<Text>Para predicar</Text>
						</ListItem>
						<ListItem>
							<Text>Mis Archivos</Text>
						</ListItem>
						<ListItem itemDivider>
							<Text>&nbsp;</Text>
						</ListItem>
						<ListItem>
							<Text>Configuración</Text>
						</ListItem>
					</List>
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	header: {
		backgroundColor: '#5B3C88',
	},
});

export default SideDrawer;
