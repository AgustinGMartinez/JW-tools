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
import truths from '../../data/topics'
import { pushView, withMenuButtons } from '../../utils/navigation'
import { MAIN_COLOR } from '../../utils/constants'
import SearchResult from '../Views/SearchResult'
import bible from '../../utils/bible'

class Truths extends React.Component {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Versículos',
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

	openInBible = (id, readble) => {
		pushView({
			screenId: 'jw-tools.Chapter',
			title: readble.split(':')[0],
			passProps: {
				id,
			},
			componentId: this.props.componentId,
			withBookButton: true,
		})
	}

	render() {
		const { verses } = this.props
		return (
			<Container>
				<Content>
					{verses.map(verse => {
						let [book, chapter, verses] = verse.split('-')
						isRange = verses.split(':').length >= 2
						let value = bible.getBook(book).get(Number(chapter))
						if (isRange) {
							verses = verses.split(':').join('-')
							value = value.getRange(verses)
						} else {
							value = value.get(Number(verses))
						}
						return (
							<SearchResult
								key={verse}
								result={{
									readble: bible.getPrettyName(verse),
									map: verse,
									value,
								}}
								open={this.openInBible}
								oneLiner
							/>
						)
					})}
				</Content>
			</Container>
		)
	}
}

export default withMenuButtons({ bibleIcon: true, menuIcon: true })(Truths)
