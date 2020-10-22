import create from 'zustand';

export type FilterValue = 'SPECIES' | 'NAME' | 'LOCATION';

export type Config = {
  open: boolean;
  listType: 'fast_list' | 'slow_list';
  loadingType: 'normal' | 'lazy';
  showPerfBall: boolean;
  toggleConfig: () => void;
  togglePerfBall: () => void;
  setListType: (list: 'fast_list' | 'slow_list') => void;
  setLoadingType: (list: 'normal' | 'lazy') => void;
};

export type Filters = {
  filter: FilterValue;
  setFilter: (f: FilterValue) => void;
};

export const useFilters = create<Filters>(set => ({
  filter: 'NAME',
  setFilter: (filter: FilterValue) => set({ filter }),
  config: {
    open: false,
    listType: 'slow_list',
  },
}));

export const useConfig = create<Config>(set => ({
  open: false,
  showPerfBall: false,
  toggleConfig: () => set(state => ({ open: !state.open })),
  listType: 'slow_list',
  loadingType: 'normal',
  setListType: () =>
    set(state => ({
      listType: state.listType === 'slow_list' ? 'fast_list' : 'slow_list',
    })),
  togglePerfBall: () => set(state => ({ showPerfBall: !state.showPerfBall })),
  setLoadingType: () =>
    set(state => ({
      loadingType: state.loadingType === 'normal' ? 'lazy' : 'normal',
    })),
}));
