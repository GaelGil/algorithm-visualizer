import type { FormProps } from "../types/formProps";

const AlgorithmForm: React.FC<FormProps> = ({
  value,
  options,
  onChange,
  onSubmit,
  onReset,
  disabled,
}) => (
  <form
    onSubmit={onSubmit}
    className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
  >
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="algorithm"
      >
        Algorithms
      </label>
      <select
        id="algorithm"
        value={value}
        onChange={onChange}
        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Algorithm</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>

    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      disabled={disabled}
    >
      Submit
    </button>
    <button
      type="button"
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
      onClick={onReset}
    >
      Reset
    </button>
  </form>
);

export default AlgorithmForm;
