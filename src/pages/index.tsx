import AddQuestionForm from '@components/AddQuestionForm';
import AppConfig from '@components/AppConfig';
import QuestionsList from '@components/QuestionsList';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useQuestions } from 'state/questions/hooks/useQuestions';

const Home: NextPage = () => {
  const { restorePreviousQuestions } = useQuestions();

  useEffect(() => {
    const undo = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        restorePreviousQuestions();
      }
    };

    document.addEventListener('keydown', undo);

    return () => {
      document.removeEventListener('keydown', undo);
    };
  }, [restorePreviousQuestions]);

  return (
    <main className="mx-auto px-4 max-w-4xl py-10">
      <Head>
        <title>Question/Answer app</title>
      </Head>

      <AppConfig />

      <QuestionsList />
      <AddQuestionForm />
    </main>
  );
};

export default Home;
