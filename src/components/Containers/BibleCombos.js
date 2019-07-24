import React from 'react';
import HorizontalLazyPagination from '../UI/HorizontalLazyPagination';
import BibleChapter from './Chapter';
import { Spinner } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { MAIN_COLOR } from '../../utils/constants';

class BibleCombos extends React.Component {
	changeTopBarName = (title, subtitle = undefined) => {
		Navigation.mergeOptions(this.props.componentId, {
			topBar: {
				title: {
					text: title,
				},
				subtitle: {
					text: subtitle,
				},
			},
		});
	};

	render() {
		const { verses } = this.props;
		return (
			<HorizontalLazyPagination
				data={verses}
				renderRow={item => (
					<BibleChapter key={item.accesor} id={item.accesor} />
				)}
				loader={<Spinner color={MAIN_COLOR} />}
				numberOfRenderedViews={3}
				onReleaseDragTouch={(data, index) => {
					let [bookAndChap, verses] = data[index].displayName.split(':');
					this.changeTopBarName(bookAndChap, verses);
				}}
			/>
		);
	}
}

export default BibleCombos;
