import React, { useState } from 'react';
import { Score } from '../types/scores';

const QuizContext = React.createContext<
	| {
			scores: Score[][];
			setScores: React.Dispatch<React.SetStateAction<Score[][]>>;
	  }
	| undefined
>(undefined);

export default function QuizContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [scores, setScores] = useState<Score[][]>([]);

	return (
		<QuizContext.Provider
			value={{
				scores,
				setScores,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

export const useQuizContext = () => {
	const context = React.useContext(QuizContext);
	if (context === undefined) {
		throw new Error('useQuizContext must be used within a QuizContextProvider');
	}
	return context;
};
