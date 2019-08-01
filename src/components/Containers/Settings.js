import React from 'react';
import { Text } from 'react-native';
import { Container, Content, ListItem, Body, Right } from 'native-base';
import MultiSlider from 'react-native-range';
import { connect } from 'react-redux';
import { setFontSize } from '../../actions/settingsActions';
import { withMenuButtons } from '../../utils/navigation';
import { MAIN_COLOR } from '../../utils/constants';

class Settings extends React.Component {
	static options(props) {
		return {
			topBar: {
				title: {
					text: 'Configuración',
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
		};
	}

	changeFontSizeValue = value => {
		this.props.setFontSize(value);
	};

	render() {
		const { fontSize } = this.props;
		return (
			<Container>
				<Content>
					<ListItem>
						<Body>
							<Text>Tamaño de la letra</Text>
						</Body>
						<Right>
							<MultiSlider
								values={[fontSize]}
								onValuesChangeFinish={([value]) =>
									this.changeFontSizeValue(value)
								}
								sliderLength={140}
								min={14}
								max={30}
								step={2}
							/>
						</Right>
					</ListItem>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	fontSize: state.settings.fontSize,
});

const mapActionsToProps = dispatch => ({
	setFontSize: size => dispatch(setFontSize(size)),
});

export default withMenuButtons({ bibleIcon: true, menuIcon: true })(
	connect(
		mapStateToProps,
		mapActionsToProps
	)(Settings)
);
