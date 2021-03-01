import { GetServerSideProps } from 'next';
import { CountdownProvider } from '../contexts/CountdownContext';

import Sidebar from '../components/Sidebar';
import React from 'react';
import { Head } from 'next/document';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import ChallengeBox from '../components/ChallengeBox';
import CompletedCahallenges from '../components/CompletedChallenges';
import Profile from '../components/Profile';
import ExperienceBar from '../components/ExperienceBar';
import Countdown from '../components/Countdown';

interface userGithub {
  name: string;
  avatar_url: string;
}

interface HomeProps {
  user: userGithub;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Login(props: HomeProps) {
  const { user } = props;
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <Head>
        <title>{user.name} | Movie.it</title>
      </Head>

      <Sidebar />

      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile {...user} />
            <CompletedCahallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = ctx.params;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      user,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
