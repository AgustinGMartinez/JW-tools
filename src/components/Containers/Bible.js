import React from 'react';
import bible from '../../utils/bible';
import { Content, Container, Text, Spinner } from 'native-base';

class SearchBarContainer extends React.PureComponent {
	state = {
		text: '',
		hightlight: '',
	};

	componentDidMount() {
		const id = this.props.id;
		const [book, chapter, hightlight] = id.split('-');

		const content = bible
			.getBook(+book)
			.get(+chapter)
			.getRange('1-999');
		this.setState({ text: content, hightlight });
	}

	render() {
		const { text, hightlight } = this.state;
		console.log(hightlight);

		return (
			<Container>
				<Content padder>
					{text ? <Text>{text}</Text> : <Spinner color={'#5B3C88'} />}
				</Content>
			</Container>
		);
	}
}

export default SearchBarContainer;
