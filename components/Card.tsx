import { useState } from 'react';
import { Character, getEpisodeName } from '../pages/api';
import { useConfig } from '../store';
import { Loader } from './Loader';
import { ReactComponent as ChevronUp } from '../assets/chevron-up.svg';

type Props = {
  data: Character;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-100">{label}</span>
      <span className="text-lg hover:text-orange-500 text-gray-500 cursor-pointer">
        {value}
      </span>
    </div>
  );
}

type EpisodesState =
  | {
      tag: 'initial';
    }
  | {
      tag: 'loading';
    }
  | {
      tag: 'ready';
      episodes: string[];
    }
  | {
      tag: 'loaded';
      episodes: string[];
    };

function EpisodesList({
  state,
  onChevronClick,
}: {
  state: EpisodesState;
  onChevronClick: () => void;
}) {
  if (state.tag === 'loading') {
    return <Loader mode="CARD_LOADER" />;
  }
  if (state.tag === 'ready') {
    return (
      <div className="pt-4 pb-2">
        {state.episodes.map(ep => (
          <span
            key={ep}
            className="inline-block bg-purple-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2">
            {ep}
          </span>
        ))}
        <ChevronUp
          onClick={onChevronClick}
          className="h-10 w-full flex justify-center mt-6 cursor-pointer"
          width={50}
        />
      </div>
    );
  }
  return null;
}

export default function Card({ data }: Props) {
  const [episodes, setEpisodes] = useState<EpisodesState>({ tag: 'initial' });

  const { loadingType } = useConfig();

  const loadEps = async () => {
    if (loadingType === 'lazy') {
      const promises = data.episode.map(ep => getEpisodeName(ep.id));
      const episResult = await Promise.all(promises);
      const epiArray: string[] = episResult.map(res => res.data.episode.name);
      setEpisodes({ tag: 'loaded', episodes: epiArray });
    }
  };

  const hideEpisodes = () => {
    setEpisodes({ tag: 'initial' });
  };

  const showEpisodes = async () => {
    try {
      if (episodes.tag === 'loaded') {
        setEpisodes({ tag: 'ready', episodes: episodes.episodes });
      } else {
        setEpisodes({ tag: 'loading' });
        const promises = data.episode.map(ep => getEpisodeName(ep.id));
        const episResult = await Promise.all(promises);
        const epiArray: string[] = episResult.map(res => res.data.episode.name);
        setEpisodes({ tag: 'ready', episodes: epiArray });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card rounded overflow-hidden shadow-lg my-4 m-6 bg-card-gray min-w-full">
      <img
        height={100}
        className="w-full"
        src={data.image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div
          className="font-bold text-xl mb-2 text-gray-200 tracking-wide hover:text-orange-500 cursor-pointer"
          onClick={showEpisodes}
          onMouseEnter={loadEps}>
          {data.name}
        </div>
        <Field label="Location" value={data.location.name} />

        <div className="pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {data.species}
          </span>
        </div>
        <div className="pt-4 pb-2">
          <EpisodesList state={episodes} onChevronClick={hideEpisodes} />
          {/* <span className="inline-block bg-purple-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2">
            {data.species}
          </span> */}
        </div>
      </div>
    </div>
  );
}
