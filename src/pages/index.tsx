import AddQuestionForm from '@components/AddQuestionForm';
import AppConfig from '@components/AppConfig';
import QuestionsList from '@components/QuestionsList';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
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
