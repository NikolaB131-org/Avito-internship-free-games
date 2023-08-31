import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { gamesSelector, gamesStatusSelector, gamesErrorMessageSelector } from '../../redux/slices/games/selectors';
import { useEffect } from 'react';
import { fetchGames } from '../../redux/slices/games/thunks';
import { Card, Typography, Result, List, Image, Space } from 'antd';
import styles from './Home.module.css';

const { Meta } = Card;
const { Text } = Typography;

function Home() {
  const dispatch = useAppDispatch();
  const games = useSelector(gamesSelector);
  const status = useSelector(gamesStatusSelector);
  const errorMessage = useSelector(gamesErrorMessageSelector);

  useEffect(() => {
    dispatch(fetchGames({ platform: 'all', category: '2d', sortBy: 'popularity' }));
  }, [dispatch]);

  if (status === 'failed') {
    return <Result status={500} title={'Ошибка'} subTitle={errorMessage} />
  }

  return (
    <List
      className={styles.list}
      grid={{
        gutter: 20,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={games}
      loading={status === 'loading'}
      renderItem={game => (
        <List.Item>
          <Card
            bodyStyle={{ height: '200px', padding: '16px' }}
            hoverable
            cover={
              <Image
                style={{ objectFit: 'cover' }}
                alt='Обложка игры'
                src={game.thumbnailLink}
                loading='lazy'
                preview={false}
                height={140}
                width={'auto'}
              />
            }
          >
            <Meta
              title={game.title}
              description={
                <Space style={{ margin: '0 auto' }} direction='vertical' size={'small'}>
                  <Text>Дата релиза: {game.releaseDate}</Text>
                  <Text>Издатель: {game.publisher}</Text>
                  <Text>Жанр: {game.genre}</Text>
                </Space>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default Home;
