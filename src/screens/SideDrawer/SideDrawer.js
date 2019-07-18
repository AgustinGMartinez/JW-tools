import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, View, ListItem, Text } from 'native-base';
import { initRootNavigation } from '../../utils/navigation';

class SideDrawer extends React.Component {
	changeView = id => {
		switch (id) {
			case 'home':
				this.openView('jw-tools.Search', 'Inicio');
				break;

			case 'preaching':
				this.openView('jw-tools.Preaching', 'Para predicar');
				break;

			default:
				break;
		}
	};

	openView = (screenId, title) => {
		initRootNavigation({ screenId, title });
	};

	render() {
		return (
			<Container>
				<Content>
					<View>
						<ListItem onPress={() => this.changeView('home')}>
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
						<ListItem onPress={() => this.changeView('preaching')}>
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
					</View>
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({});

export default SideDrawer;
