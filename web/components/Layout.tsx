import usePlayer from 'hooks/usePlayer';
import Header from 'components/Header';
import Player from 'components/Player';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { activePlayerItem } = usePlayer();

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-start items-center">
        <div className="w-full lg:max-w-5xl p-8">{children}</div>
      </div>
      {activePlayerItem && (
        <div className="fixed bottom-0 left-0 right-0">
          <Player />
        </div>
      )}
    </div>
  );
};

export default Layout;
