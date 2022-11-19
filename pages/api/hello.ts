// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Quiz {
	id: number;
	question: string;
	answer: number | number[];
	options: string[];
}

type Data = {
	quizzes: Quiz[];
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({
		quizzes: [
			{
				id: 1,
				question: 'What is 2 + 2?',
				answer: 3,
				options: ['1', '2', '3', '4'],
			},
			{
				id: 2,
				question: 'What is 3 + 3?',
				answer: 2,
				options: ['4', '5', '6', '7'],
			},
			{
				id: 3,
				question: 'What is 4 + 4?',
				answer: 2,
				options: ['6', '7', '8', '9'],
			},
			{
				id: 4,
				question: 'What is 5 + 5?',
				answer: 2,
				options: ['8', '9', '10', '11'],
			},
		],
	});
}
