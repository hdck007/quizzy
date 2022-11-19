import '../styles/globals.css';
import type { AppProps } from 'next/app';
import QuizContextProvider from '../contexts/quizcontext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QuizContextProvider>
			<Component {...pageProps} />
		</QuizContextProvider>
	);
}
