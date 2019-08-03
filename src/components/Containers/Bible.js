import React from 'react';
import bible from '../../utils/bible';
import { Content, Container, Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { withMenuButtons, pushView } from '../../utils/navigation';
import { MAIN_COLOR } from '../../utils/constants';
import { shadeColor } from '../../utils/colorFunctions';

// const booksCentralColor = shadeColor('#1b0f38');
const booksCentralColor = '#796b9c';

class Bible extends React.Component {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Biblia',
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

	renderBooks = () => {
		const hebrewScriptures = [];
		const greekScriptures = [];

		Array(66)
			.fill(1)
			.forEach((_, i) => {
				if (i < 39) {
					hebrewScriptures.push(
						<TouchableOpacity
							key={i}
							style={[
								s.book,
								{
									backgroundColor: shadeColor(
										booksCentralColor,
										Math.random() * 40 - 50
									),
								},
							]}
							onPress={() => this.openBook(i + 1)}
						>
							<Text style={s.bookText}>{bible.getDisplayAbbr(i + 1)}</Text>
						</TouchableOpacity>
					);
				} else {
					greekScriptures.push(
						<TouchableOpacity
							key={i}
							style={[
								s.book,
								{
									backgroundColor: shadeColor(
										booksCentralColor,
										Math.random() * 40 - 50
									),
								},
							]}
							onPress={() => this.openBook(i + 1)}
						>
							<Text style={s.bookText}>{bible.getDisplayAbbr(i + 1)}</Text>
						</TouchableOpacity>
					);
				}
			});

		return (
			<>
				<Text style={s.title}>ESCRITURAS HEBREOARAMEAS</Text>
				<View style={[s.booksContainer, s.hebrewScripturesContainer]}>
					{hebrewScriptures}
				</View>
				<Text style={s.title}>ESCRITURAS GRIEGAS CRISTIANAS</Text>
				<View style={[s.booksContainer, s.greekScripturesContainer]}>
					{greekScriptures}
				</View>
			</>
		);
	};

	openBook = number => {
		pushView({
			screenId: 'jw-tools.Book',
			componentId: this.props.componentId,
			title: bible.getBookDisplayName(number),
			passProps: {
				book: number,
			},
		});
	};

	render() {
		return (
			<Container style={s.container}>
				<Content showVerticalScrollIndicator={false}>
					{this.renderBooks()}
				</Content>
			</Container>
		);
	}
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
	hebrewScripturesContainer: {
		marginVertical: 15,
	},
	greekScripturesContainer: {
		marginVertical: 15,
	},
	book: {
		height: 60,
		width: 60,
		backgroundColor: '#ddd',
		justifyContent: 'center',
		alignItems: 'flex-start',
		margin: 1,
		padding: 10,
	},
	bookText: {
		color: 'white',
	},
});

export default withMenuButtons({ menuIcon: true })(Bible);
