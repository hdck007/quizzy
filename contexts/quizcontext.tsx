import React, { useState } from 'react';

export const QuizContext = React.createContext({});

export default function QuizContextProvider({ children } : { children: React.ReactNode }) {
	const [scores, setScores] = useState([]);

	return (
		<QuizContext.Provider
			value={{
        scores,
        setScores
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

