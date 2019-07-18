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

class Preaching extends React.PureComponent {
	render() {
		return (
			// <Container>
			// 	<Content>
			/* <View>
						{combos.map(combo => {
							return (
								<ListItem key={combo.displayName} icon>
									<Body>
										<Text>{combo.displayName}</Text>
									</Body>

									<Right>
										<Icon active name="arrow-forward" />
									</Right>
								</ListItem>
							);
						})}
					</View> */

			/* <BibleChapter id={'gene-2-4:7'} />
				</Content>
			</Container> */
			<HorizontalLazyPagination
				data={[
					<BibleChapter key={'gene-2-4:7'} id={'gene-2-4:7'} />,
					<BibleChapter key={'22-2-2:7'} id={'22-2-2:7'} />,
					<BibleChapter key={'55-2-1:3'} id={'55-2-1:3'} />,
					<BibleChapter key={'66-22-5:7'} id={'66-22-5:7'} />,
				]}
				renderRow={item => item}
				loader={<Spinner color={'#5B3C88'} />}
				numberOfRenderedViews={3}
			/>
		);
	}
}

export default withMenuButton(Preaching);
