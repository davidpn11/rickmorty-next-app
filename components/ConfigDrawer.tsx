import { useConfig } from '../store';
import { Switch, SwitchOption } from './Switch';

const listOptionA: SwitchOption<'slow_list'> = {
  value: 'slow_list',
  text: '🐌 List',
};

const listOptionB: SwitchOption<'fast_list'> = {
  value: 'fast_list',
  text: '🔥 List',
};

const loadingOptionA: SwitchOption<'lazy'> = {
  value: 'lazy',
  text: 'Lazy Loading',
};

const loadingOptionB: SwitchOption<'normal'> = {
  value: 'normal',
  text: 'Meh loading',
};

function PerfBallButton({
  showPerfBall,
  onClick,
}: {
  showPerfBall: boolean;
  onClick: () => void;
}) {
  const btnColor = showPerfBall
    ? 'bg-red-500 hover:bg-red-700'
    : 'bg-universe-blue hover:bg-blue-700';
  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded ${btnColor}`}
      onClick={onClick}>
      {showPerfBall ? 'hide perf ball' : 'show perf ball'}
    </button>
  );
}

export function ConfigDrawer() {
  const {
    open,
    listType,
    setListType,
    togglePerfBall,
    showPerfBall,
    loadingType,
    setLoadingType,
  } = useConfig();
  const isOpen = open ? 'flex' : 'hidden';

  return (
    <div
      className={`${isOpen} flex transition border w-full bg-transparent text-white flex flex-row justify-between border-universe-blue rounded-lg mt-4 px-24 py-12`}>
      <Switch
        id="loading-switch"
        value={loadingType}
        optionA={loadingOptionA}
        optionB={loadingOptionB}
        onChange={a => setLoadingType(a)}
      />
      <Switch
        id="list-switch"
        value={listType}
        optionA={listOptionA}
        optionB={listOptionB}
        onChange={a => {
          console.log(a);
          setListType(a);
        }}
      />
      <PerfBallButton showPerfBall={showPerfBall} onClick={() => togglePerfBall()} />
    </div>
  );
}
