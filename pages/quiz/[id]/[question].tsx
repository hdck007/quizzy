import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import RadialProgress from '../../../src/components/radialprogress';
import { quizzes } from '../../../src/utils/constants';
import Image from 'next/image';
import OptionComponent from '../../../src/components/optioncomponent';
import { QuizContext } from '../../../contexts/quizcontext';
import { IOption } from '../../../types/option';

interface IQuestion {
	question: string;
	options: IOption[];
	answer: number[];
	image?: string;
}

export default function Question({
	question,
	id,
	questionNumber,
	totalQuestions,
	optionsArr,
}: {
	question: IQuestion;
	id: string;
	questionNumber: string;
	totalQuestions: number;
	optionsArr: IOption[];
}) {
	const router = useRouter();
	const [isDisabled, setIsDisabled] = useState(true);
	const [options, setOptions] = useState<IOption[]>([]);
	const { scores, setScores }: any = useContext(QuizContext);

	useEffect(() => {
		setOptions(optionsArr);
		setIsDisabled(true);
	}, [optionsArr]);

	const handleOptionClick = (optionValue: string, index: number) => {
		const newOptions = options.map((option: IOption, i: number) => {
			if (i == index) {
				return {
					...option,
					selected: !option.selected,
				};
			}
			return option;
		});
		let flag = true;
		newOptions.forEach((option) => {
			if (option.selected) {
				flag = false;
			}
		});
		setIsDisabled(flag);
		setOptions(newOptions);
	};

	const handleSubmit = () => {
		const selectionArr = options
			.map((option, index) => ({
				...option,
				index: index,
			}))
			.filter((option) => option.selected);
		if (scores.length < Number(questionNumber)) {
			const newScores = [...scores];
			newScores[+questionNumber] = selectionArr;
			setScores(selectionArr);
		} else {
			const newScores = [...scores, 0];
			newScores[+questionNumber] = selectionArr;
			setScores(newScores);
		}
		router.push(`/quiz/${id}/submit`);
	};

	const handleNextClick = () => {
		const selectionArr = options
			.map((option, index) => ({
				...option,
				index: index,
			}))
			.filter((option) => option.selected);
		if (scores.length < Number(questionNumber)) {
			const newScores = [...scores];
			newScores[+questionNumber] = selectionArr;
			setScores(selectionArr);
		} else {
			const newScores = [...scores, 0];
			newScores[+questionNumber] = selectionArr;
			setScores(newScores);
		}
		router.push(`/quiz/${id}/${Number(questionNumber) + 1}`);
	};

	return (
		<div className='w-full mx-auto bg-purple-500 min-h-screen overflow-hidden'>
			<div className='w-full md:w-4/5 mx-auto h-screen flex items-end'>
				<div className='h-[90%] bg-white rounded-t-3xl bottom-0 relative prose lg:prose-xl min-w-full '>
					<div className='absolute top-[-60px] left-0 w-full flex justify-center items-center'>
						<div
							className='mx-auto bg-white rounded-full p-1  '
							style={{
								width: '130px',
								height: '130px',
							}}
						>
							<RadialProgress
								currentStage={+questionNumber + 1}
								totalStages={totalQuestions}
							/>
						</div>
					</div>
					<div className='w-full h-full flex flex-col items-center justify-between'>
						<div id='question'>
							<h2 className='text-center py-5 pt-8'>{question.question}</h2>
						</div>
						<div className='w-full h-[80vh] overflow-auto flex flex-col'>
							{!!question.image && (
								<Image
									className='mx-auto'
									width={200}
									height={200}
									src={require('../../../public/example.jpeg')}
									alt={question.question}
								/>
							)}
							<div
								id='options'
								className='my-auto w-full flex flex-col lg:flex-row lg:flex-wrap justify-around'
							>
								{options.map((option, index) => (
									<OptionComponent
										key={index}
										option={option}
										index={index}
										questionNumber={questionNumber}
										handleOptionClick={handleOptionClick}
									/>
								))}
							</div>
						</div>
						<div className='w-3/5 flex justify-center items-center rounded-full border border-primary my-5'>
							{+questionNumber + 1 == totalQuestions && (
								<button
									onClick={handleSubmit}
									className='w-full btn btn-primary rounded-full text-white text-2xl'
									disabled={isDisabled}
								>
									Submit
								</button>
							)}
							{!(+questionNumber + 1 == totalQuestions) && (
								<button
									className=' btn btn-primary text-2xl text-white w-full py-2 rounded-full'
									onClick={handleNextClick}
									disabled={isDisabled}
								>
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// type safe getServersideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id, question }: any = context.params;

	if (
		Number(id) > quizzes.length - 1 ||
		Number(question) > quizzes[id].questions.length - 1
	) {
		return {
			notFound: true,
		};
	}

	const options = quizzes[id].questions[question].options.map(
		(option: string) => ({
			value: option,
			selected: false,
		})
	);

	return {
		props: {
			question: quizzes[id].questions[question],
			id: id,
			questionNumber: question,
			totalQuestions: quizzes[id].questions.length,
			optionsArr: options,
		},
	};
};
