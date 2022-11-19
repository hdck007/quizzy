import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	function handleStart() {
		router.push('/quiz/0/0');
	}

	return (
		<div className='w-full mx-auto bg-gradient-to-b from-purple-50 to-purple-900 min-h-screen overflow-hidden'>
			<div className='w-full md:w-4/5 mx-auto h-screen relative'>
				<div className='w-full h-full rounded-t-3xl bottom-0 flex justify-center items-center'>
					<div
						id='start'
						className=' w-60 h-60 cursor-pointer  rounded-full bg-white flex justify-center items-center
						 shadow-lg
						'
					>
						<h1 className='text-4xl text-primary'>Quiz</h1>
					</div>
				</div>
				<div className='absolute bottom-6 w-full flex justify-center items-center'>
					<button
						onClick={handleStart}
						className='btn btn-primary w-4/5 rounded-full text-2xl'
					>
						Start
					</button>
				</div>
			</div>
		</div>
	);
}
