import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';

const QUERY = gql`
  query {
    signUp
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY);
  console.log(data);

  let content;
  if (loading) {
    content = 'Loading...';
  } else if (error) {
    content = error.message;
  } else if (data) {
    content = data.signUp.id;
  }

  return (
    <div>
      <Head>
        <title>Trad Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-center text-red-700 text-xl mt-4">
          {content}
        </div>
      </main>
    </div>
  );
}
