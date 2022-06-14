import AddQuestionForm from '@components/AddQuestionForm';
import QuestionsList from '@components/QuestionsList';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <main className="container py-10">
      <Head>
        <title>Question/Answer app</title>
      </Head>

      <QuestionsList />
      <AddQuestionForm />
    </main>
  );
};

export default Home;
