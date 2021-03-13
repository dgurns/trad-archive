import { React } from '@ungap/global-this';
import Header from 'components/Header';

const { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const shouldShowPreviewWarning =
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF !== 'master';
  const branchName = NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
    ? `Branch name: ${NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}`
    : undefined;

  return (
    <div>
      {shouldShowPreviewWarning && (
        <div className="flex flex-row items-center justify-center p-1 bg-black text-white">
          This is a preview version of the site with fake data. {branchName}
        </div>
      )}
      <Header />
      <div className="flex flex-col justify-start items-center">
        <div className="w-full lg:max-w-5xl py-6 px-4 pb-44">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
