import { ConfigProvider, Layout, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

function Root() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: 16,
          colorPrimary: 'var(--accent-color)',
          colorBgBase: '#141414',
        },
        components: {
          Layout: {
            colorBgHeader: '#202020',
          },
          Spin: {
            colorPrimary: 'var(--accent-color)',
            colorBgContainer: 'transparent',
          },
          Button: {
            colorPrimary: 'var(--accent-color)',
            colorPrimaryHover: '#3c8618'
          },
          Carousel: {
            dotHeight: 5,
            colorBgContainer: 'var(--accent-color)'
          },
          Descriptions: {
            itemPaddingBottom: 4,
          },
          Typography: {
            titleMarginBottom: 8
          },
          Select: {
            colorPrimaryHover: 'var(--accent-color)',
          },
        }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Link to={'/'}>
            <span style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--accent-color)' }}>Free Games</span>
          </Link>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default Root;
