import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import useCurrentUser from 'hooks/useCurrentUser';
import Layout from 'components/Layout';

const LOG_IN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      permissions
      email
      username
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [currentUser, { refetch: refetchCurrentUser }] = useCurrentUser();

  const [logIn, { loading, data, error }] = useMutation(LOG_IN_MUTATION, {
    errorPolicy: 'all',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogIn = (event) => {
    event.preventDefault();
    logIn({ variables: { email, password } });
  };

  useEffect(() => {
    if (data) {
      refetchCurrentUser();
    }
  }, [data, refetchCurrentUser]);

  if (currentUser) {
    router.push('/');
  }

  return (
    <Layout>
      <h1 className="mb-4">Log in to Trad Archive</h1>
      <div className="flex flex-col align-start max-w-xs">
        <form onSubmit={onLogIn}>
          <input
            placeholder="Your email"
            autoFocus
            className="mb-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder="Your password"
            type="password"
            className="mb-4"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="submit"
            className="btn mb-4 w-auto"
            disabled={loading}
            value="Log In"
          />
        </form>
        {error && <div className="text-red-600">{error.message}</div>}
      </div>
    </Layout>
  );
};

export default Login;
