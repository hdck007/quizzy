import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { quizzes } from '../../../src/utils/constants';

export default function Home({ question, id, questionNumber, isLastQuestion }) {
	const router = useRouter();

	const handleOptionClick = (option, index) => {
		console.log(option, index);
	};

	const handleSubmit = () => {
		console.log('submit');
	};

	const handleNextClick = () => {
		router.push(`/quiz/${id}/${Number(questionNumber) + 1}`);
	};

	return (
		<div className='w-full mx-auto bg-purple-500 min-h-screen overflow-hidden'>
			<div className='w-full md:w-4/5 mx-auto h-screen flex items-end'>
				<div className='h-[90%] bg-white rounded-t-3xl bottom-0 relative prose lg:prose-xl min-w-full flex flex-col items-center justify-between '>
					<div
						className="absolute top-[-60px] left-[40%] w-full h-full"
					>
						<div className="radial-progress bg-white text-success border-4  border-white" style={{"--value":70, "--size": "8rem"}}>1</div>
					</div>
					<div id='question'>
						<h2 className='text-center py-5 pt-8'>{question.question}</h2>
					</div>
					<div
						id='options'
						className=' overflow-auto h-[40%] mt-auto  flex flex-wrap justify-around'
					>
						{question.options.map((option, index) => (
							<div className='form-control' key={'random' + index}>
								<label className='label cursor-pointer w-96 h-20 bg-neutral rounded-xl flex justify-start px-6 items-center my-2'>
									<input
										type='checkbox'
										className='checkbox checkbox-success accent-white mr-2 rounded-full'
									/>
									<span className='label-text'>Remember me</span>
								</label>
							</div>
						))}
					</div>
					<div className='w-full flex justify-center items-center py-5'>
						{isLastQuestion && (
							<button
								onClick={handleSubmit}
								className='w-4/5 btn btn-primary rounded-full text-white text-2xl'
							>
								Submit
							</button>
						)}
						{!isLastQuestion && (
							<button
								className=' btn btn-primary text-2xl text-white w-4/5 py-2 rounded-full'
								onClick={handleNextClick}
							>
								Next
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// type safe getServersideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id, question }: any = context.params;
	return {
		props: {
			question: quizzes[id].questions[question],
			id: id,
			questionNumber: question,
			isLastQuestion: quizzes[id].questions.length === Number(question) + 1,
		},
	};
};
