import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Trad Archive</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-center text-red-700 text-xl mt-4">
          Hello world
        </div>
      </main>
    </div>
  );
}
