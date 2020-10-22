import { ReactComponent as RickMortyIcon } from '../assets/RickMorty.svg';

type Props = {
  mode: 'FULL_SCREEN' | 'CARD_LOADER';
};

export function Loader({ mode = 'FULL_SCREEN' }: Props) {
  switch (mode) {
    case 'CARD_LOADER':
      return null;
    case 'FULL_SCREEN':
    default:
      return (
        <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-transparent">
          <div className="animate-bounce">
            <div className="animate-pulse">
              <RickMortyIcon width={200} fill="firebrick" />
            </div>
          </div>
        </div>
      );
  }
}
