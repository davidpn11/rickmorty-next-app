export type SwitchOption<T> = {
  text: string;
  value: T;
};
type Props<A, B> = {
  id: string;
  value: A | B;
  optionA: SwitchOption<A>;
  optionB: SwitchOption<B>;
  onChange: (v: A | B) => void;
};

export function Switch<A extends string, B extends String>(props: Props<A, B>) {
  const toggle = () => {
    props.value === props.optionA.value
      ? props.onChange(props.optionB.value)
      : props.onChange(props.optionA.value);
  };

  const isChecked = props.value === props.optionB.value ? 'translate-x-full' : '';

  return (
    <div className="flex flex-col pointer uppercase" onClick={toggle}>
      <label htmlFor="unchecked" className="mt-3 inline-flex items-center cursor-pointer">
        <span className="mr-3 text-lg">{props.optionA.text}</span>
        <span className="relative">
          <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner"></span>
          <span
            className={`absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-300 transform ${isChecked}`}>
            <input
              id={props.id}
              type="checkbox"
              className="absolute opacity-0 w-0 h-0"
              onClick={toggle}
            />
          </span>
        </span>
        <span className="ml-3 text-lg">{props.optionB.text}</span>
      </label>
    </div>
  );
}
