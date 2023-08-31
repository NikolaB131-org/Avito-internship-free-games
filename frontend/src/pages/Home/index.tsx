import { useAppDispatch } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { gamesSelector, gamesStatusSelector, gamesErrorMessageSelector } from '../../redux/slices/games/selectors';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SCROLL_LOADING_COUNT } from '../../constants';
import { FetchGamesArgs } from '../../redux/slices/games/types';
import { fetchGames } from '../../redux/slices/games/thunks';
import { Result, List, Select, Space, Typography } from 'antd';
import GameCard from '../../components/GameCard';
import styles from './Home.module.css';

const { Text } = Typography;

function Home() {
  const dispatch = useAppDispatch();
  const games = useSelector(gamesSelector);
  const status = useSelector(gamesStatusSelector);
  const errorMessage = useSelector(gamesErrorMessageSelector);
  const intersectionObserver = useRef<IntersectionObserver>(); // useRef для того чтобы сохранять информацию при ререндерах

  const [gamesShown, setGamesShown] = useState(SCROLL_LOADING_COUNT);
  const [platform, setPlatform] = useState<FetchGamesArgs['platform']>('all');
  const [category, setCategory] = useState<FetchGamesArgs['category']>('3d');
  const [sortBy, setSortBy] = useState<FetchGamesArgs['sortBy']>('relevance');

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
    dispatch(fetchGames({ platform, category, sortBy }));
  }, [dispatch, platform, category, sortBy]);

  const onPlatformChange = (value: FetchGamesArgs['platform']) => {
    setPlatform(value);
  };

  const onCategoryChange = (value: FetchGamesArgs['category']) => {
    setCategory(value);
  };

  const onSortByChange = (value: FetchGamesArgs['sortBy']) => {
    setSortBy(value);
  };

  if (status === 'failed') {
    return <Result status={500} title={'Ошибка'} subTitle={errorMessage} />;
  }

  return (
    <div className={styles.container}>
      <Space className={styles.filters} size='large'>
        <Space size='small'>
          <Text>Платформа:</Text>
          <Select
            style={{ width: 110 }}
            onChange={onPlatformChange}
            defaultValue={platform}
            options={[
              { value: 'all', label: 'Все' },
              { value: 'pc', label: 'ПК' },
              { value: 'browser', label: 'Браузер' },
            ]}
          />
        </Space>
        <Space size='small'>
          <Text>Категория:</Text>
          <Select
            style={{ width: 220 }}
            onChange={onCategoryChange}
            defaultValue={category}
            options={[
              { value: 'mmorpg', label: 'MMORPG' },
              { value: 'shooter', label: 'Шутер' },
              { value: 'strategy', label: 'Стратегия' },
              { value: 'moba', label: 'MOBA' },
              { value: 'racing', label: 'Гонки' },
              { value: 'sports', label: 'Спортивная' },
              { value: 'social', label: 'Социальная' },
              { value: 'sandbox', label: 'Песочница' },
              { value: 'open-world', label: 'Открытый мир' },
              { value: 'survival', label: 'Выживание' },
              { value: 'pvp', label: 'PvP' },
              { value: 'pve', label: 'PvE' },
              { value: 'pixel', label: 'Пиксельная' },
              { value: 'voxel', label: 'Воксельная' },
              { value: 'zombie', label: 'Про зомби' },
              { value: 'turn-based', label: 'Пошаговая стратегия' },
              { value: 'first-person', label: 'От первого лица' },
              { value: 'third-Person', label: 'От третьего лица' },
              { value: 'top-down', label: 'Вид сверху' },
              { value: 'tank', label: 'Про танки' },
              { value: 'space', label: 'Про космос' },
              { value: 'sailing', label: 'Про корабли' },
              { value: 'side-scroller', label: 'Сайд-скроллер' },
              { value: 'superhero', label: 'Суперспособности' },
              { value: 'card', label: 'Карточная' },
              { value: 'battle-royale', label: 'Королевская битва' },
              { value: 'mmo', label: 'ММО' },
              { value: 'mmofps', label: 'ММОFPS' },
              { value: 'mmotps', label: 'ММОTPS' },
              { value: '3d', label: '3D' },
              { value: '2d', label: '2D' },
            ]}
          />
        </Space>
        <Space size='small'>
          <Text>Сортировать по:</Text>
          <Select
            style={{ width: 160 }}
            onChange={onSortByChange}
            defaultValue={sortBy}
            options={[
              { value: 'relevance', label: 'Релевантности' },
              { value: 'popularity', label: 'Популярности' },
              { value: 'release-date', label: 'Дате выхода' },
              { value: 'alphabetical', label: 'Алфавиту' },
            ]}
          />
        </Space>
      </Space>
      <List
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
    </div>
  );
}

export default Home;
