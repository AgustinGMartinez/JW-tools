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
import truths from '../../data/truths'
import { pushView, withMenuButtons } from '../../utils/navigation'
import { MAIN_COLOR } from '../../utils/constants'

class Truths extends React.Component {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Verdades',
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

	openTeaching = content => {
		pushView({
			screenId: 'jw-tools.Teaching',
			title: content.displayName,
			passProps: { content },
			componentId: this.props.componentId,
		})
	}

	render() {
		return (
			<Container>
				<Content>
					{truths.map((truth, index) => (
						<ListItem key={index} icon onPress={() => this.openTeaching(truth)}>
							<Body>
								<Text>{truth.displayName}</Text>
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

export default withMenuButtons({ bibleIcon: true, menuIcon: true })(Truths)
