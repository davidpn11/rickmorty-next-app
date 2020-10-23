import { FilterValue } from '../store';

type Props = {
  filterValue: FilterValue;
  onChange: (v: FilterValue) => void;
};

const isSelected = (isSelected: boolean) => {
  return !isSelected
    ? 'hover:bg-purple-500 bg-gray-100 text-gray-700 border-gray-600 transition'
    : 'hover:bg-purple-500 hover:text-gray-100 bg-purple-100 text-purple-500 border-purple-300 transition';
};

export default function Filters(props: Props) {
  const onClick = (value: FilterValue) => () => props.onChange(value);
  return (
    <div className="p-5 pl-0">
      <div className="flex justify-content items-baseline flex-wrap">
        <button
          onClick={onClick('NAME')}
          className={`text-base  rounded-r-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        border duration-200 ease-in-out
        ${isSelected(props.filterValue === 'NAME')}
        border-purple-300 transition`}>
          Name
        </button>
        <button
          onClick={onClick('SPECIES')}
          className={`text-base  rounded-r-none rounded-l-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
          ${isSelected(props.filterValue === 'SPECIES')}
        border duration-200 ease-in-out
        border-purple-300 transition`}>
          Species
        </button>
        <button
          onClick={onClick('LOCATION')}
          className={`text-base  rounded-l-none  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
          ${isSelected(props.filterValue === 'LOCATION')}
          border duration-200 ease-in-out
          border-purple-300 transition`}>
          Location
        </button>
      </div>
    </div>
  );
}
