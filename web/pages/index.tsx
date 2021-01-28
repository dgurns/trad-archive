import useItems from 'hooks/useItems';
import Layout from 'components/Layout';
import Item from 'components/Item';
import Loading from 'components/Loading';

export default function Home() {
  const [items, { loading, error }] = useItems();

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  } else if (error) {
    return <Layout>{error.message}</Layout>;
  } else if (!items) {
    return 'No items found';
  }

  return (
    <Layout>
      {items.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </Layout>
  );
}
