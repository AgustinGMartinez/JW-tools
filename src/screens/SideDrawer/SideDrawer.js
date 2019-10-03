import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, View, ListItem, Text } from 'native-base'
import { setStackRoot } from '../../utils/navigation'
import { connect } from 'react-redux'

class SideDrawer extends React.Component {
	changeView = id => {
		switch (id) {
			case 'home':
				this.openView('jw-tools.Search', true, true)
				break

			case 'preaching':
				this.openView('jw-tools.Preaching', true, true)
				break

			case 'topics':
				this.openView('jw-tools.Topics', true, true)
				break

			case 'settings':
				this.openView('jw-tools.Settings', true)
				break

			case 'truths':
				this.openView('jw-tools.Truths', true)
				break

			case 'principles':
				this.openView('jw-tools.Principles', true)
				break

			case 'lessons':
				this.openView('jw-tools.Lessons', true)
				break

			case 'bible':
				this.openView('jw-tools.Bible', true)
				break

			default:
				break
		}
	}

	openView = (screenId, withMenuButton = false, withBibleButton = false) => {
		const { openerId } = this.props
		setStackRoot({
			screenId,
			withBibleButton,
			withMenuButton,
			stackId: openerId,
		})
	}

	render() {
		return (
			<Container>
				<Content>
					<View>
						<ListItem onPress={() => this.changeView('home')}>
							<Text>Inicio</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('bible')}>
							<Text>Biblia</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('truths')}>
							<Text>Verdades</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('principles')}>
							<Text>Principios</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('lessons')}>
							<Text>Lecciones</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('preaching')}>
							<Text>Para predicar</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('topics')}>
							<Text>Temas</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('revisits')}>
							<Text>Revisitas</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('videos')}>
							<Text>Videos</Text>
						</ListItem>
						<ListItem>
							<Text>Mis Archivos</Text>
						</ListItem>
						<ListItem itemDivider>
							<Text>&nbsp;</Text>
						</ListItem>
						<ListItem onPress={() => this.changeView('settings')}>
							<Text>Configuración</Text>
						</ListItem>
					</View>
				</Content>
			</Container>
		)
	}
}

const s = StyleSheet.create({})

const mapStateToProps = state => ({
	openerId: state.navigation.openerId,
})

export default connect(mapStateToProps)(SideDrawer)
