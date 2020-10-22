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
  const { open, listType, setListType } = useConfig();
  const isOpen = open ? 'flex' : 'hidden';

  return (
    <div
      className={`${isOpen} transition py-24 w-full bg-transparent text-white flex justify-between`}>
      <Switch
        value={listType}
        optionA={listOptionA}
        optionB={listOptionB}
        onChange={a => setListType(a)}
      />
    </div>
  );
}
