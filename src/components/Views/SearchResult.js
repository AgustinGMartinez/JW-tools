import React, { Component } from 'react'
import { Card, CardItem, Text, Body } from 'native-base'

class CardItemBordered extends Component {
	render() {
		const { result, oneLiner, open } = this.props
		return (
			<Card>
				<CardItem
					header
					bordered
					button
					onPress={() => open(result.map, result.readble)}
				>
					<Text>{result.readble}</Text>
				</CardItem>
				<CardItem bordered>
					<Body>
						{oneLiner ? (
							<Text numberOfLines={1}>{result.value}</Text>
						) : (
							<Text>{result.value}</Text>
						)}
					</Body>
				</CardItem>
			</Card>
		)
	}
}

export default CardItemBordered
