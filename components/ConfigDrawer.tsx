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

export function ConfigDrawer() {
  const {
    open,
    listType,
    setListType,
  } = useConfig();
  const isOpen = open ? 'hidden' : 'flex';

  return (
    <div
      className={`${isOpen} transition py-24 w-full bg-transparent text-white`}>
      Little labbbb
      <Switch
        value={listType}
        optionA={listOptionA}
        optionB={listOptionB}
        onChange={a => {
          console.log('AZAO', a);
          setListType(a);
        }}
      />
    </div>
  );
}
