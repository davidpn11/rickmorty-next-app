import { Character } from '../pages';

type Props = {
  data: Character;
};

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-100">
        {label}
      </span>
      <span className="text-lg hover:text-purple-500 text-gray-500 cursor-pointer">
        {value}
      </span>
    </div>
  );
}

export default function Card({ data }: Props) {
  return (
    <div className="card rounded overflow-hidden shadow-lg my-4 m-6 bg-card-gray min-w-full">
      <img
        height={100}
        className="w-full"
        src={data.image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-200 tracking-wide hover:text-purple-500 cursor-pointer">
          {data.name}
        </div>
        <Field
          label="Location"
          value={data.location.name}
        />

        <div className="pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {data.species}
          </span>
        </div>
      </div>
    </div>
  );
}
