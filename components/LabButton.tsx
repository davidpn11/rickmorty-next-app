import { ButtonHTMLAttributes } from 'react';
import { ReactComponent as LabIcon } from '../assets/LabIcon.svg';

export function LabButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className="p-0 w-20 h-20 bg-purple-300 rounded-full hover:opacity-75 shadow-2xl mouse hover:shadow-lg transition ease-in duration-200 focus:outline-none flex items-center justify-center">
      <LabIcon fill="white" width={50} />
    </button>
  );
}
