import React from 'react';
import { withMenuButtons } from '../../utils/navigation';
import ChapterView from '../Views/Chapter';

function Chapter(props) {
	return <ChapterView {...props} />;
}

export default withMenuButtons({ chapterIcon: true })(Chapter);
