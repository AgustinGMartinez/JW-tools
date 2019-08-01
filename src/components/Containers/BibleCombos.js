import React from 'react';
import HorizontalLazyPagination from '../UI/HorizontalLazyPagination';
import BibleChapter from './Chapter';
import { Spinner } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { MAIN_COLOR } from '../../utils/constants';
import { withMenuButtons } from '../../utils/navigation';

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

	componentDidMount() {
		this.props.sendDataToWrapper(this.props.verses[0].accesor);
	}

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
					let map = data[index].accesor;
					this.changeTopBarName(bookAndChap, verses);
					this.props.sendDataToWrapper(map);
				}}
			/>
		);
	}
}

export default withMenuButtons({ bibleIcon: true })(BibleCombos);
