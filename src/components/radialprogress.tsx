import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function RadialProgress({
	currentStage,
	totalStages,
	withcolor,
}: {
	withcolor?: boolean;
	currentStage: number;
	totalStages: number;
}) {
	const getColor = () => {
		const value = Math.floor((currentStage * 100) / totalStages);
		if (value < 25) {
			return '#FF0000';
		} else if (value < 50) {
			return '#FFA500';
		} else if (value < 75) {
			return '#FFFF00';
		} else {
			return '#00FF00';
		}
	};

	return (
		<CircularProgressbarWithChildren
			styles={buildStyles({
				pathColor: withcolor ? getColor() : `rgb(68, 183, 123)`,
				textColor: '#f88',
				trailColor: '#d6d6d6',
				backgroundColor: 'rgb(255, 255, 255)',
			})}
			value={Math.floor((currentStage * 100) / totalStages)}
		>
			{!withcolor && (
				<span>
					<span className=' text-4xl text-bold '>{currentStage}</span>
					<span>/{totalStages}</span>
				</span>
			)}
			{withcolor && (
				<span>
					<span className=' text-4xl text-bold '>{Math.floor((currentStage * 100) / totalStages)}%</span>
				</span>
			)}
		</CircularProgressbarWithChildren>
	);
}
