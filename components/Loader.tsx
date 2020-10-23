import { ReactComponent as RickMortyIcon } from '../assets/RickMorty.svg';

type Props = {
  mode: 'FULL_SCREEN' | 'CARD_LOADER';
};

export function Loader({ mode = 'FULL_SCREEN' }: Props) {
  switch (mode) {
    case 'CARD_LOADER':
      return (
        <div className="w-full flex items-center justify-center">
          <RickMortyIcon className="animate-spin" width={50} fill="#ED8936" />
        </div>
      );
    case 'FULL_SCREEN':
    default:
      return (
        <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-transparent">
          <div className="animate-bounce">
            <div className="animate-pulse">
              <RickMortyIcon width={200} fill="#ED8936" />
            </div>
          </div>
        </div>
      );
  }
}
