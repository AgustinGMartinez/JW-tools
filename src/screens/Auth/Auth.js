import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { initTabBasedNavigation } from '../index';
import DefaultInput from '~/src/components/UI/DefaultInput/DefaultInput';
import HeadingText from '~/src/components/UI/HeadingText/HeadingText';
// import getBook from '~/src/utils/bible';

// console.log(
// 	getBook('gene')
// 		.get(1)
// 		.getRange('1-3')
// );

const loginHandler = () => initTabBasedNavigation();

const auth = () => {
	return (
		<View style={s.container}>
			<HeadingText>Por favor, ingresar</HeadingText>
			<Button title="Registrarse" />
			<View style={s.inputContainer}>
				<DefaultInput style={s.input} placeholder="Email" />
				<DefaultInput style={s.input} placeholder="Password" />
				<DefaultInput style={s.input} placeholder="Confirm password" />
			</View>
			<Button title="Ingresar" onPress={loginHandler} />
		</View>
	);
};

const s = StyleSheet.create({
	container: {
		height: Dimensions.get('window').height,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: '80%',
	},
	input: {
		borderColor: '#ddd',
		backgroundColor: '#eee',
	},
});

export default auth;
