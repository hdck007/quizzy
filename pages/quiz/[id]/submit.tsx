import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RadialProgress from '../../../src/components/radialprogress';
import { useQuizContext } from '../../../contexts/quizcontext';
import { quizzes } from '../../../src/utils/constants';
import { GetServerSideProps } from 'next/types';
import { Score } from '../../../types/scores';

export default function Home({ id }: { id: number }) {
	const router = useRouter();
	const [score, setScore] = useState(0);
	const [statusWiseScores, setStatusWiseScores] = useState({
		correct: 0,
		incorrect: 0,
	});

	const { scores, setScores } = useQuizContext();

	const handleStartAgain = () => {
		router.push('/');
	};

	useEffect(() => {
		let totalScore = 0;
		const scoreValue = scores.map(() => ({
			score: 0,
		}));
		scores.forEach((scoreArr: Score[], index: number) => {
			scoreArr.forEach((option: Score, i: number) => {
				if (quizzes[id].questions[index].answer.indexOf(option.index) > -1) {
					scoreValue[index].score +=
						quizzes[id].questions[index].options.length /
						quizzes[id].questions[index].answer.length;
				} else {
					scoreValue[index].score -=
						quizzes[id].questions[index].options.length /
						quizzes[id].questions[index].answer.length;
				}
			});
		});
		let statusObject = {
			correct: 0,
			incorrect: 0,
		};
		const newScoreValue = scoreValue.map((scoreObj: { score: number }) => {
			if (scoreObj.score > 0) {
				statusObject.correct++;
				return {
					...scoreObj,
				};
			} else {
				statusObject.incorrect++;
				return {
					...scoreObj,
					score: 0,
				};
			}
		});
		newScoreValue.forEach((score: { score: number }) => {
			totalScore += score.score;
		});
		setStatusWiseScores({ ...statusObject });
		setScore(totalScore);
		setScores([]);
	}, []);

	return (
		<div className='w-full mx-auto bg-purple-500 min-h-screen overflow-hidden'>
			<div className='w-full md:w-4/5 mx-auto h-screen flex items-end'>
				<div className='h-[90%] bg-white rounded-t-3xl bottom-0 relative prose lg:prose-xl min-w-full flex flex-col items-center justify-between  pb-5 '>
					<div className='left-0 w-full flex justify-center items-center'>
						<div
							className='mx-auto'
							style={{
								width: '200px',
								height: '200px',
								background: 'white',
								padding: '4px',
								borderRadius: '100%',
								marginTop: '100px',
							}}
						>
							<RadialProgress
								withcolor
								currentStage={score}
								totalStages={quizzes[id].questions.length * 4}
							/>
						</div>
					</div>
					<div className='w-4/5 flex flex-col items-center justify-center gap-4 '>
						<div className='w-full bg-success p-5  rounded-md '>
							{statusWiseScores.correct} Correct
						</div>
						<div className='w-full bg-error p-5 rounded-md '>
							{statusWiseScores.incorrect} Incorrect
						</div>
					</div>
					<button
						className=' btn btn-primary text-2xl text-white w-4/5 py-2 rounded-full my-5'
						onClick={handleStartAgain}
					>
						Start Again
					</button>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id }: any = context.params;

	return {
		props: {
			id: Number(id),
		},
	};
};
