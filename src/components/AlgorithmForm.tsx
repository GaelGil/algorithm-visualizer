import type { FormProps } from "../types/formProps";

const AlgorithmForm: React.FC<FormProps> = ({
  value,
  options,
  onChange,
  onSubmit,
  onReset,
  disabled,
}) => (
  <form onSubmit={onSubmit} className="">
    <div className="mb-4 flex items-center">
      <label className="font-bold" htmlFor="algorithm">
        Algorithms
      </label>
      <select
        id="algorithm"
        value={value}
        onChange={onChange}
        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ml-2"
      >
        <option value="">Select Algorithm</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4 flex space-x-4 text-white">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        disabled={disabled}
      >
        Submit
      </button>
      <button
        type="button"
        className="bg-black hover:bg-gray-400 font-bold py-2 px-4 rounded"
        onClick={onReset}
        disabled={disabled}
      >
        Reset
      </button>
    </div>
  </form>
);

export default AlgorithmForm;
