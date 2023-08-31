import { Carousel, Result, Spin, Typography, Image, Button, Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { gameSelector, gameStatusSelector, gameErrorMessageSelector } from '../../redux/slices/game/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { useEffect } from 'react';
import { fetchGameById } from '../../redux/slices/game/thunks';
import { clearGame } from '../../redux/slices/game';
import styles from './Game.module.css';

const { Title } = Typography;

function Game() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const game = useSelector(gameSelector);
  const status = useSelector(gameStatusSelector);
  const errorMessage = useSelector(gameErrorMessageSelector);

  useEffect(() => {
    if (id) {
      const controller = new AbortController();
      dispatch(fetchGameById({ id: +id, controller }));

      return () => {
        controller.abort(); // отмена запроса
        dispatch(clearGame());
      };
    }

  }, [dispatch, id]);

  let content = <></>;

  switch (status) {
    case 'failed': {
      content = <Result status={500} title={'Ошибка'} subTitle={errorMessage} />;
      break;
    }
    case 'loading': {
      content = <Spin size='large'/>;
      break;
    }
    case 'idle': {
      if (game) {
        content = (
          <div className={styles.container}>
            <header className={styles.header}>
              <Link to={'/'}>
                <Button type='primary' style={{ marginBottom: '10px' }}>Вернуться на главную</Button>
              </Link>
              <Image
                src={game.thumbnailLink}
                preview={false}
                style={{ height: '60px' }}
              />
            </header>
            <Title level={2}>{game.title}</Title>
            <div className={styles.content}>
              <Carousel className={styles.carousel} autoplay>
                {game.screenshots.map(screenshot => (
                  <Image
                    style={{ objectFit: 'cover' }}
                    key={screenshot.id}
                    src={screenshot.image}
                    preview={false}
                  />
                ))}
              </Carousel>
              <Descriptions column={1}>
                <Descriptions.Item label='Жанр'>{game.genre}</Descriptions.Item>
                <Descriptions.Item label='Дата выхода'>{game.releaseDate}</Descriptions.Item>
                <Descriptions.Item label='Разработчик'>{game.developer}</Descriptions.Item>
                <Descriptions.Item label='Издатель'>{game.publisher}</Descriptions.Item>
              </Descriptions>
            </div>
            {game.minimumSystemRequirements && (
              <>
                <Title level={4}>Системные требования</Title>
                <Descriptions column={1}>
                  <Descriptions.Item label='ОС'>{game.minimumSystemRequirements.os}</Descriptions.Item>
                  <Descriptions.Item label='Процессор'>{game.minimumSystemRequirements.processor}</Descriptions.Item>
                  <Descriptions.Item label='Оперативная память'>{game.minimumSystemRequirements.memory}</Descriptions.Item>
                  <Descriptions.Item label='Видеокарта'>{game.minimumSystemRequirements.graphics}</Descriptions.Item>
                  <Descriptions.Item label='Место на диске'>{game.minimumSystemRequirements.storage}</Descriptions.Item>
                </Descriptions>
              </>
            )}
          </div>
        );
        break;
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      {content}
    </div>
  );
}

export default Game;
