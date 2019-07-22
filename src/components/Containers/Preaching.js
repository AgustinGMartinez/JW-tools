import React from 'react';
import bible from '../../utils/bible';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import {
	Container,
	Content,
	Text,
	ListItem,
	Right,
	Body,
	Icon,
	Spinner,
} from 'native-base';
import combos from '../../data/preaching.json';
import { withMenuButton } from '../../utils/navigation';
import BibleChapter from './Chapter';
import HorizontalLazyPagination from '../UI/HorizontalLazyPagination';
import { pushView } from '../../utils/navigation';

class Preaching extends React.PureComponent {
	openCombos = verses => {
		pushView({
			screenId: 'jw-tools.BibleCombos',
			passProps: {
				verses,
			},
			title: verses[0].displayName.split(':')[0],
			subtitle: verses[0].displayName.split(':')[1],
			componentId: this.props.componentId,
		});
	};

	render() {
		return (
			<Container>
				<Content>
					<View>
						{combos.map(combo => {
							return (
								<ListItem
									key={combo.displayName}
									icon
									onPress={() => this.openCombos(combo.verses)}
								>
									<Body>
										<Text>{combo.displayName}</Text>
									</Body>

									<Right>
										<Icon active name="ios-arrow-forward" />
									</Right>
								</ListItem>
							);
						})}
					</View>
				</Content>
			</Container>
		);
	}
}

export default withMenuButton(Preaching);
