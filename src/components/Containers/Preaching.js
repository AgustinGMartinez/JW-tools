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
import { withMenuButtons } from '../../utils/navigation';
import { pushView } from '../../utils/navigation';
import { MAIN_COLOR } from '../../utils/constants';

class Preaching extends React.PureComponent {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Para predicar',
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
				rightButtons: [
					{
						id: 'bibleButton',
						icon: props.bibleIcon,
						color: 'white',
					},
				],
			},
		};
	}

	openCombos = verses => {
		pushView({
			screenId: 'jw-tools.BibleCombos',
			passProps: {
				verses,
			},
			title: verses[0].displayName.split(':')[0],
			subtitle: verses[0].displayName.split(':')[1],
			componentId: this.props.componentId,
			withBookButton: true,
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

export default withMenuButtons({ bibleIcon: true, menuIcon: true })(Preaching);
