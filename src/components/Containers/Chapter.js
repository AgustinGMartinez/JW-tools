import React from 'react';
import bible from '../../utils/bible';
import { Container, Text, Spinner } from 'native-base';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';

/**
 * THIS COMPONENT MUST BE CALLED WITH THE PROP ID, WHICH CAN BE '19-1-1' || '19-1-1:3' || '19-1'
 * FOR highlight OF 1 VERSE, OF A RANGE, AND NO highlight RESPECTIVELY
 */

class Chapter extends React.PureComponent {
	state = {
		content: '',
		highlight: '',
	};

	componentWillMount() {
		const id = this.props.id;
		let [book, chapter, highlight] = id.split('-');
		if (highlight) highlight = highlight.split(':').map(Number);

		const content = bible
			.getBook(book)
			.get(+chapter)
			.getRangeMap('1-999');
		this.setState({ content: content, highlight });
	}

	onhighlightTextRendered = e => {
		if (this.highlightedText) {
			this.highlightedText.measure((fx, fy, width, height, px, py) => {
				if (this.content) {
					this.content.scrollTo({
						x: px,
						y: py - 20, // add a little margin
					});
				}
			});
		}
	};

	render() {
		const { content, highlight } = this.state;
		const { settingsFontSize } = this.props;
		const userFontSize = multiplier => ({
			fontSize: settingsFontSize * multiplier,
		});
		const chapterNumberStyling = [s.chapterNumber, userFontSize(1.5)];
		const verseNumberStyling = [s.verseNumber, userFontSize(1.15)];
		const verseContentStyling = [s.verseContent, userFontSize(1)];

		// SEPARETED CONTENT FOR THE VIEW HACK
		const displayContentHalf1 = [];
		const displayContentHighlighted = [];
		const displayContentHalf2 = [];
		// -----------------------------------

		// CALCULATE HIGHLIGHT RANGE
		const highlightVerseFrom = highlight[0];
		const highlightVerseTo = highlight[1];
		const highlightVerses = [];
		if (highlightVerseTo) {
			const difference = highlightVerseTo - highlightVerseFrom;
			if (difference === 1) {
				// no range, just these 2
				highlightVerses.push(highlightVerseFrom);
				highlightVerses.push(highlightVerseTo);
			} else {
				// range, push all in bewteen
				Array(difference + 1)
					.fill(1)
					.forEach((_, i) => {
						highlightVerses.push(highlightVerseFrom + i);
					});
			}
		} else {
			// only one verse to highlight
			highlightVerses.push(highlightVerseFrom);
		}

		content &&
			content.forEach((text, index) => {
				if (highlightVerses.includes(index)) {
					displayContentHighlighted.push(
						<View
							ref={text => {
								// save the first one only because we use this to scroll to it
								if (highlightVerses[0] === index) {
									this.highlightedText = text;
								}
							}}
							key={index}
							style={[s.wrap, verseContentStyling]}
						>
							<Text>
								<Text
									style={
										index === 1 ? chapterNumberStyling : verseNumberStyling
									}
								>
									{text.slice(
										0,
										index < 10 ? 3 : 4 // number and 2 spaces after it
									) /* includes spaces so not to highlight them*/}
								</Text>
								<Text style={[verseContentStyling, s.highlighted]}>
									{/* trim the last highlighted text, because the view hack already jumps to a new line */}
									{highlightVerses.slice(-1)[0] === index
										? text.slice(index < 10 ? 3 : 4).trim()
										: text.slice(index < 10 ? 3 : 4)}
								</Text>
							</Text>
						</View>
					);
				} else if (!displayContentHighlighted.length) {
					displayContentHalf1.push(
						<Text key={index}>
							{/* below is to add space between verses */}
							&nbsp;&nbsp;
							<Text
								style={index === 1 ? chapterNumberStyling : verseNumberStyling}
							>
								{text.slice(0, 2)}
							</Text>
							<Text style={verseContentStyling}>
								{/* if it's the verse right before the highlighted ones, trim because the view hack already jumps to a new line */}
								{highlightVerses[0] - index === 1
									? text.slice(2).trim()
									: text.slice(2)}
							</Text>
						</Text>
					);
				} else {
					displayContentHalf2.push(
						<Text key={index} style={verseContentStyling}>
							{/* below is to add space between verses */}
							&nbsp;&nbsp;
							<Text
								style={index === 1 ? chapterNumberStyling : verseNumberStyling}
							>
								{text.slice(0, 2)}
							</Text>
							{text.slice(2)}
						</Text>
					);
				}
			});

		return (
			<Container>
				<ScrollView
					padder
					contentContainerStyle={s.container}
					ref={content => (this.content = content)}
					onLayout={this.onhighlightTextRendered}
					nestedScrollEnabled
					showsVerticalScrollIndicator={false}
				>
					{content ? (
						// this is the view hack
						<>
							<Text>{displayContentHalf1}</Text>
							{displayContentHighlighted}
							<Text>{displayContentHalf2}</Text>
						</>
					) : (
						<Spinner color={'#5B3C88'} />
					)}
				</ScrollView>
			</Container>
		);
	}
}

const s = StyleSheet.create({
	container: {
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft: 20,
		paddingRight: 20,
		width: Dimensions.get('window').width,
	},
	chapterNumber: {
		color: '#5B3C88',
		fontWeight: '500',
		fontSize: 30,
	},
	verseNumber: {
		color: '#5B3C88',
		fontWeight: '500',
		fontSize: 23,
	},
	verseContent: {
		fontSize: 20,
	},
	highlighted: {
		backgroundColor: '#feff94',
	},
	wrap: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		flexWrap: 'wrap',
	},
});

const mapStateToProps = state => ({
	settingsFontSize: state.settings.fontSize,
});

export default connect(mapStateToProps)(Chapter);
