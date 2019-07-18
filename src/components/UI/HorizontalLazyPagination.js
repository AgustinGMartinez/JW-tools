import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import propTypes from 'prop-types';

class HorizontalLazyPagination extends React.Component {
	static propTypes = {
		data: propTypes.array.isRequired,
		renderRow: propTypes.func.isRequired,
		initialIndex: propTypes.number,
		onReleaseDragTouch: propTypes.func,
		loader: propTypes.element,
		horizontalScrollViewProps: propTypes.object,
		numberOfRenderedViews: propTypes.number,
	};

	static defaultProps = {
		initialIndex: 0,
		onReleaseDragTouch: () => {},
		loader: <Text>Loading...</Text>,
		horizontalScrollViewProps: {},
		numberOfRenderedViews: 3,
	};

	state = {
		central: this.props.initialIndex,
	};

	goToInitialIndex = () => {
		this.wrapper.scrollTo({
			x: Dimensions.get('window').width * this.props.initialIndex,
			animated: false,
		});
	};

	handleScroll = event => {
		const newIndex = Math.round(
			event.nativeEvent.contentOffset.x / Dimensions.get('window').width
		);
		this.setState({ central: newIndex });
		this.props.onReleaseDragTouch(newIndex);
	};

	renderDummyContent = () => (
		<View key={'' + Math.random().toFixed(4)} style={s.dummyPage}>
			{this.props.loader}
		</View>
	);

	render() {
		let { central } = this.state;
		let {
			data,
			numberOfRenderedViews,
			horizontalScrollViewProps,
			renderRow,
		} = this.props;

		const renderData = data.filter((_, i) => {
			return (
				i >= central - Math.round((numberOfRenderedViews - 1) / 2) &&
				i <= central + Math.round((numberOfRenderedViews - 1) / 2)
			);
		});

		// for hacking the index
		const dummyDataBeforeTheContent = [];
		const dummyDataAfterTheContent = [];

		if (central >= 1) {
			const remainingDummySpaces =
				central - Math.round((numberOfRenderedViews - 1) / 2);
			Array(remainingDummySpaces)
				.fill(1)
				.forEach(() => {
					dummyDataBeforeTheContent.push(this.renderDummyContent());
				});
		}

		if (central < data.length - 1) {
			dummyDataAfterTheContent.push(this.renderDummyContent());
		}

		return (
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				ref={view => (this.wrapper = view)}
				onMomentumScrollEnd={this.handleScroll}
				onLayout={this.goToInitialIndex}
				{...horizontalScrollViewProps}
			>
				{dummyDataBeforeTheContent}
				{renderData.map((item, index) => {
					return renderRow(item, index);
				})}
				{dummyDataAfterTheContent}
			</ScrollView>
		);
	}
}

const s = StyleSheet.create({
	dummyPage: {
		width: Dimensions.get('window').width,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HorizontalLazyPagination;
