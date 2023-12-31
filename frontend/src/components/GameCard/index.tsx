import { Card, List, Image, Spin, Descriptions } from 'antd';
import { GameShort } from '../../../../backend/src/types';
import { useState, useEffect, forwardRef } from 'react';
import fetchRetry from '../../utils/fetchRetry';
import { Link } from 'react-router-dom';

const { Meta } = Card;

type Props = {
  data: GameShort;
};

const GameCard = forwardRef<HTMLDivElement, Props>(function GameCard({ data }, ref) {
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();

    const fetchImage = async () => {
      const compressedImageResponse = await fetchRetry( // фетчим маленькое изображение
        3, `${import.meta.env.VITE_API_URL}/game/thumbnail/compressed/${data.id}`, { signal: controller.signal }
      );
      if (compressedImageResponse.ok) {
        const blob = await compressedImageResponse.blob();
        setImageSrc(URL.createObjectURL(blob));
      }

      const fullImageResponse = await fetchRetry( // фетчим большое изображение
        3, `${import.meta.env.VITE_API_URL}/game/thumbnail/full/${data.id}`, { signal: controller.signal }
      );
      if (fullImageResponse.ok) {
        const blob = await fullImageResponse.blob();
        setImageSrc(URL.createObjectURL(blob));
      }
    };

    fetchImage();

    return () => { // отмена запросов при переходе на другую страницу
      controller.abort();
    };
  }, [data.id]);

  return (
    <List.Item ref={ref}>
      <Link to={`/game/${data.id}`}>
        <Card
          bodyStyle={{ height: '200px', padding: '16px' }}
          hoverable
          cover={
            imageSrc ? (
              <Image
                style={{ objectFit: 'cover' }}
                alt='Обложка игры'
                src={imageSrc}
                height={140}
                preview={false}
              />
            ) : (
              <Spin
                style={{
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                size='large'
              />
            )
          }
        >
          <Meta
            title={data.title}
            description={
              <Descriptions column={1}>
                <Descriptions.Item label='Жанр'>{data.genre}</Descriptions.Item>
                <Descriptions.Item label='Дата выхода'>{data.releaseDate}</Descriptions.Item>
                <Descriptions.Item label='Издатель'>{data.publisher}</Descriptions.Item>
              </Descriptions>
            }
          />
        </Card>
      </Link>
    </List.Item>
  );
});

export default GameCard;
