import React, { Component } from 'react';
import { Card, CardItem, Text, Body } from 'native-base';

class CardItemBordered extends Component {
	render() {
		const { result } = this.props;
		return (
			<Card>
				<CardItem
					header
					bordered
					button
					onPress={() => this.props.open(result.map, result.readble)}
				>
					<Text>{result.readble}</Text>
				</CardItem>
				<CardItem bordered>
					<Body>
						<Text>{result.value}</Text>
					</Body>
				</CardItem>
			</Card>
		);
	}
}

export default CardItemBordered;
