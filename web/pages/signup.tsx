import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';

import useCurrentUser from 'hooks/useCurrentUser';
import Layout from 'components/Layout';
import { User } from 'types';

const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      id
      permissions
      email
      username
    }
  }
`;
interface MutationData {
  signUp: User;
}

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validationError, setValidationError] = useState('');

  const [signUp, { loading, data, error }] = useMutation<MutationData>(
    SIGN_UP_MUTATION,
    {
      errorPolicy: 'all',
    }
  );
  const onSignUp = (event) => {
    event.preventDefault();
    setValidationError('');
    if (password !== passwordConfirmation) {
      setValidationError("Passwords don't match");
      return;
    }
    signUp({ variables: { email, username, password } });
  };

  const [currentUser, { refetch: refetchCurrentUser }] = useCurrentUser();

  useEffect(() => {
    if (data?.signUp) {
      refetchCurrentUser();
    }
  }, [data, refetchCurrentUser]);

  if (currentUser) {
    router.push('/');
  }

  return (
    <Layout>
      <h1 className="mb-4">Create your account</h1>
      <div className="flex flex-col align-start max-w-xs">
        <form onSubmit={onSignUp}>
          <input
            placeholder="Your email"
            autoFocus
            className="mb-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            placeholder="Your full name"
            className="mb-2"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            placeholder="Choose a password"
            type="password"
            className="mb-2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            placeholder="Repeat password"
            type="password"
            className="mb-4"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
          <input
            type="submit"
            className="btn mb-4 w-auto"
            disabled={loading}
            value="Sign Up"
          />
        </form>

        {validationError && (
          <div className="text-red-600 mb-4">{validationError}</div>
        )}
        {error && <div className="text-red-600 mb-4">{error.message}</div>}

        <div>
          Already have an account?{' '}
          <Link href="/login">
            <button className="btn-text">Log In</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
