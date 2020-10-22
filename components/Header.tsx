import { useConfig, useFilters } from '../store';
import { ConfigDrawer } from './ConfigDrawer';
import Filters from './Filter';
import { LabButton } from './LabButton';

export function Header() {
  // const { filter, setFilter } = useFilters();
  // const { open, toggleOpen } = useConfig();
  const filter = useFilters();
  const config = useConfig();
  console.log({ filter, config });
  return (
    <div className="flex w-full flex-col bg-transparent justify-between px-6 py-6">
      <div className="flex w-full flex-row justify-between align-center">
        <Filters
          filterValue={filter.filter}
          onChange={f => filter.setFilter(f)}
        />
        <LabButton
          onClick={() => config.toggleConfig()}
        />
      </div>
      <ConfigDrawer />
    </div>
  );
}
