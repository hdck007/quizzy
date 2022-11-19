import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	function handleStart() {
		router.push('/quiz/0/1');
	}

	return (
		<div className='w-full mx-auto bg-purple-500 min-h-screen overflow-hidden'>
			<div className='w-full md:w-4/5 mx-auto h-screen flex items-end'>
				<div className='w-full h-[85%] md:h-[90%] bg-white rounded-t-3xl bottom-0 flex justify-center items-center'>
					<div
						onClick={handleStart}
						id='start'
						className=' w-60 h-60 cursor-pointer  rounded-full bg-red-400 flex justify-center items-center'
					>
						<h1 className='text-4xl text-white'>Start</h1>
					</div>
				</div>
			</div>
		</div>
	);
}