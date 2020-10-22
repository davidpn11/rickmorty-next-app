import { useConfig } from '../store';

export function ConfigDrawer() {
  const { open } = useConfig();
  const isOpen = open ? 'hidden' : 'flex';
  return (
    <div
      className={`${isOpen} transition py-24 w-full bg-transparent text-white`}>
      Little labbbb
    </div>
  );
}
