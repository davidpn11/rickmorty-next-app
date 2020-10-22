import create from 'zustand';

export type FilterValue =
  | 'SPECIES'
  | 'NAME'
  | 'LOCATION';

export type Config = {
  open: boolean;
  toggleConfig: () => void;
  listType: 'fast_list' | 'slow_list';
  setListType: (
    list: 'fast_list' | 'slow_list',
  ) => void;
};

export type Filters = {
  filter: FilterValue;
  setFilter: (f: FilterValue) => void;
};

export const useFilters = create<Filters>(
  set => ({
    filter: 'NAME',
    setFilter: (filter: FilterValue) =>
      set({ filter }),
    config: {
      open: false,
      listType: 'slow_list',
    },
  }),
);

export const useConfig = create<Config>(set => ({
  open: false,
  toggleConfig: () =>
    set(state => ({ open: !state.open })),
  listType: 'slow_list',
  setListType: () =>
    set(state => ({
      listType:
        state.listType === 'slow_list'
          ? 'fast_list'
          : 'slow_list',
    })),
}));
