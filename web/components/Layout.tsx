import { React } from '@ungap/global-this';
import Header from 'components/Header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-start items-center">
        <div className="w-full lg:max-w-5xl py-6 px-4 pb-44">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
