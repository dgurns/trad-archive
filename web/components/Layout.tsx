import Header from 'components/Header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
