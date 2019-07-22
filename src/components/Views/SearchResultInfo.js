import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function searchResultInfo({ total }) {
	return (
		<View style={s.container}>
			<Text>
				Mostrando {total} de {total} resultados.
			</Text>
		</View>
	);
}

const s = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		paddingBottom: 5,
	},
});

export default searchResultInfo;
