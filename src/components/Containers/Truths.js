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
import truths from '../../data/truths.json';
import { pushView, withMenuButton } from '../../utils/navigation';

class Truths extends React.Component {
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
		);
	}
}

export default withMenuButton(Truths);
