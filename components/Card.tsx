import { Character } from "../pages";

type Props = {
  character: Character;
};

export default function Card(props: Props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-4">
      <img
        className="w-full"
        src={props.character.image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.character.name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-bold">Location:</span>
          {props.character.location.name}
        </p>

        <div className="pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {props.character.species}
          </span>
        </div>
      </div>
    </div>
  );
}
