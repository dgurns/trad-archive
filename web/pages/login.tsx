import Layout from 'components/Layout';

const Login = () => {
  return (
    <Layout>
      <div className="text-xl font-bold mb-4">Log in to Trad Archive</div>
      <div className="flex flex-col align-start max-w-xs">
        <input placeholder="Your email" autoFocus className="mb-2" />
        <input placeholder="Your password" className="mb-4" />
      </div>
      <button className="btn">Log In</button>
    </Layout>
  );
};

export default Login;
