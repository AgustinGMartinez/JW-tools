import React from 'react';
import { StyleSheet } from 'react-native';
import {
	Container,
	Content,
	Card,
	CardItem,
	Body,
	Text,
	Button,
} from 'native-base';
import { pushView } from '../../utils/navigation';
import { TouchableNativeFeedback, View } from 'react-native';
import { MAIN_COLOR } from '../../utils/constants';

class Teaching extends React.Component {
	openInBible = (id, readble) => {
		const props = {
			id: id,
		};
		pushView({
			screenId: 'jw-tools.Chapter',
			title: readble.split(':')[0],
			passProps: props,
			componentId: this.props.componentId,
			withBookButton: true,
		});
	};

	render() {
		const { content: contents } = this.props;
		return (
			<Container>
				<Content>
					{contents.content.map((content, index) => (
						<Card key={index} transparent style={s.card}>
							<CardItem header>
								<Text style={s.title}>{content.title}</Text>
							</CardItem>
							<CardItem style={s.cardBody}>
								<Body>
									{content.verses && content.verses.length && (
										<View style={s.versesList}>
											{content.verses.map((verse, index) => (
												<TouchableNativeFeedback
													key={verse.map}
													onPress={() =>
														this.openInBible(verse.map, verse.display)
													}
												>
													<Text style={s.verse}>
														{verse.display}
														{index + 1 !== content.verses.length ? ', ' : null}
													</Text>
												</TouchableNativeFeedback>
											))}
										</View>
									)}
									<Text>{content.argument}</Text>
								</Body>
							</CardItem>
						</Card>
					))}
				</Content>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	card: {
		marginBottom: 15,
	},
	title: {
		textTransform: 'uppercase',
		color: '#666',
		fontSize: 23,
	},
	cardBody: {
		marginLeft: 10,
	},
	versesList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	verse: {
		marginBottom: 15,
		color: 'blue',
		fontWeight: '500',
	},
});

export default Teaching;
