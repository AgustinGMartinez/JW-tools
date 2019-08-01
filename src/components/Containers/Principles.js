import React from 'react';
import {
	Container,
	Content,
	Body,
	Text,
	Right,
	ListItem,
	Icon,
} from 'native-base';
import principles from '../../data/principles.json';
import { pushView, withMenuButtons } from '../../utils/navigation';
import { MAIN_COLOR } from '../../utils/constants';

class Principles extends React.Component {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Principios',
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
		};
	}

	openTeaching = content => {
		pushView({
			screenId: 'jw-tools.Teaching',
			title: content.displayName,
			passProps: { content },
			componentId: this.props.componentId,
		});
	};

	render() {
		return (
			<Container>
				<Content>
					{principles.map((truth, index) => (
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
		);
	}
}

export default withMenuButtons({ bibleIcon: true, menuIcon: true })(Principles);
