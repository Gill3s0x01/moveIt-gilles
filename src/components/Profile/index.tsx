import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';

import { Container } from './styles';

interface UserGitHub {
  name: string;
  avatar_url: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Profile = (user: UserGitHub) => {
  const { level } = useContext(ChallengesContext);
  return (
    <Container>
      {/* <img src={user?.avatar_url} alt={user?.name} /> */}
      <img src="https://github.com/Gilles30.png" alt="Lorison Gilles" />

      <div>
        <strong>Lorison Gilles</strong>
        {/* <strong>{user?.name}</strong> */}
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </Container>
  );
};

export default Profile;
