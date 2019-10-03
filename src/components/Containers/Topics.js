import React from 'react'
import {
	Container,
	Content,
	Body,
	Text,
	Right,
	ListItem,
	Icon,
} from 'native-base'
import topics from '../../data/topics'
import { pushView, withMenuButtons } from '../../utils/navigation'
import { MAIN_COLOR } from '../../utils/constants'

class Topics extends React.Component {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Temas',
					color: 'white',
				},
				background: {
					color: MAIN_COLOR,
				},
				leftButtons: [
					{
						id: 'sideMenuButton',
						icon: props.menuIcon,
						color: 'white',
					},
				],
			},
		}
	}

	openVersesView = topic => {
		pushView({
			screenId: 'jw-tools.Verses',
			title: topic.displayName,
			passProps: { verses: topic.verses },
			componentId: this.props.componentId,
		})
	}

	render() {
		return (
			<Container>
				<Content>
					{topics.map((topic, index) => (
						<ListItem
							key={index}
							icon
							onPress={() => this.openVersesView(topic)}
						>
							<Body>
								<Text>{topic.displayName}</Text>
							</Body>
							<Right>
								<Icon active name="ios-arrow-forward" />
							</Right>
						</ListItem>
					))}
				</Content>
			</Container>
		)
	}
}

export default withMenuButtons({ bibleIcon: true, menuIcon: true })(Topics)
