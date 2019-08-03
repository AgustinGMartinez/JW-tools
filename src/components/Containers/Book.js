import React from 'react';
import bible from '../../utils/bible';
import { Content, Container, Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { pushView, withMenuButtons } from '../../utils/navigation';

function Book(props) {
	const size = bible.getBook(props.book).size;

	const openChapter = number => {
		pushView({
			screenId: 'jw-tools.Chapter',
			componentId: props.componentId,
			title: bible.getBookDisplayName(props.book) + ' ' + number,
			passProps: {
				id: `${props.book}-${number}`,
			},
			withBibleButton: true,
		});
	};

	return (
		<Container style={s.container}>
			<Content showVerticalScrollIndicator={false}>
				<View style={s.booksContainer}>
					{Array(size)
						.fill(1)
						.map((_, i) => {
							return (
								<TouchableOpacity
									key={i}
									style={[s.book]}
									onPress={() => openChapter(i + 1)}
								>
									<Text style={s.bookText}>{i + 1}</Text>
								</TouchableOpacity>
							);
						})}
				</View>
			</Content>
		</Container>
	);
}

const s = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 30,
		backgroundColor: '#f6f6f6',
	},
	title: {
		color: '#666',
	},
	booksContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	book: {
		height: 60,
		width: 60,
		backgroundColor: '#bbb',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 10,
	},
	bookText: {
		color: 'white',
		fontSize: 20,
	},
});

export default withMenuButtons()(Book);
