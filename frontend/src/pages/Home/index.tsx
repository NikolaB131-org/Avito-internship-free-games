import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { gamesSelector, gamesStatusSelector, gamesErrorMessageSelector } from '../../redux/slices/games/selectors';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SCROLL_LOADING_COUNT } from '../../constants';
import { fetchGames } from '../../redux/slices/games/thunks';
import { Result, List } from 'antd';
import GameCard from '../../components/GameCard';
import styles from './Home.module.css';

function Home() {
  const dispatch = useAppDispatch();
  const games = useSelector(gamesSelector);
  const status = useSelector(gamesStatusSelector);
  const errorMessage = useSelector(gamesErrorMessageSelector);
  const intersectionObserver = useRef<IntersectionObserver>(); // useRef для того чтобы сохранять информацию при ререндерах

  const [gamesShown, setGamesShown] = useState(SCROLL_LOADING_COUNT);

  const lastCardRef = useCallback((card: HTMLDivElement) => { // infinite scroll
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect(); // удаляем предыдущий observer
    }

    intersectionObserver.current = new IntersectionObserver(cards => { // создаем observer
      if (cards[0].isIntersecting) { // если элемент во вьюпорте
        setGamesShown(prev => prev + SCROLL_LOADING_COUNT);
      }
    });

    if (card) { // если есть ссылка на элемент
      intersectionObserver.current.observe(card);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchGames({ platform: 'all', category: '3d', sortBy: 'popularity' }));
  }, [dispatch]);

  if (status === 'failed') {
    return <Result status={500} title={'Ошибка'} subTitle={errorMessage} />;
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
      dataSource={games.slice(0, gamesShown)}
      loading={{ spinning: status === 'loading', size: 'large' }}
      renderItem={game => (
        <GameCard ref={lastCardRef} data={game} />
      )}
    />
  );
}

export default Home;
