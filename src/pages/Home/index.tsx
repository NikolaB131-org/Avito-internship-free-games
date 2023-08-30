import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { gamesSelector } from '../../redux/slices/game/selectors';
import { useEffect } from 'react';
import { fetchGames } from '../../redux/slices/games/thunks';
import { List, Card } from 'antd';
import styles from './Home.module.css';

const { Meta } = Card;

function Home() {
  const dispatch = useAppDispatch();
  const games = useSelector(gamesSelector);

  useEffect(() => {
    dispatch(fetchGames({ platform: 'all', category: '2d', sortBy: 'popularity' }));
  }, [dispatch]);

  return (
    <List
      className={styles.list}
      grid={{
        gutter: 20,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      dataSource={games}
      renderItem={game => (
        <List.Item>
          <Card
            hoverable
            cover={<img alt='Обложка игры' src={game.thumbnailLink} />}
          >
            <Meta
              title={game.title}
              description={
                <>
                  lOL
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default Home;
