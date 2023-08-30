import { useParams } from 'react-router-dom';

function Game() {
  const { id } = useParams();

  return (
    <h1>Game page with id {id}</h1>
  );
}

export default Game;
