import type { Info } from "../types/info";

// Algorithm info component to display info on the algorithms.
// takes in props "info" which is a type defined in types.
// since we have sorting and traversal algorithms we can use this
// to load in on each page without having to rewrite this
const AlgorithmInfo: React.FC<{ info: Info[] }> = ({ info }) => (
  <div className="flex flex-wrap justify-center mb-4">
    {info.map((info, index) => (
      <div key={index} className="w-full md:w-1/2 xl:w-1/3 p-4">
        <div className="rounded shadow-md p-4 h-full">
          <h2 className=" text-lg font-bold mb-2">{info.name}</h2>
          <p>{info.description}</p>
          {info.link && (
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default AlgorithmInfo;
