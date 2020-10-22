import { useConfig } from '../store';

export function ConfigDrawer() {
  const { open } = useConfig();
  const isOpen = open ? 'hidden' : 'flex';
  return (
    <div className={`${isOpen}`}>heloooo</div>
  );
}
