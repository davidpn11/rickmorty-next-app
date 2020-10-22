import { ButtonHTMLAttributes } from 'react';
import { ReactComponent as LabIcon } from '../assets/LabIcon.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { useConfig } from '../store';

export function LabButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open } = useConfig();
  return (
    <button
      {...props}
      className="p-0 w-20 h-20 bg-purple-300 rounded-full hover:opacity-75 shadow-2xl mouse hover:shadow-lg transition ease-in duration-200 focus:outline-none flex items-center justify-center">
      {open ? <CloseIcon fill="white" width={30} /> : <LabIcon fill="white" width={50} />}
    </button>
  );
}
