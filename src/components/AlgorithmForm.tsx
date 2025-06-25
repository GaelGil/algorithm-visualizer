import { Form, Button } from "react-bootstrap";
import type { FormProps } from "../types/formProps";

// type Props = {
//   value: string;
//   options: string[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   onReset: () => void;
//   disabled?: boolean;
// };

const AlgorithmForm: React.FC<FormProps> = ({
  value,
  options,
  onChange,
  onSubmit,
  onReset,
  disabled,
}) => (
  <Form onSubmit={onSubmit} className="p-3 border rounded bg-light shadow">
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">Algorithms</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        <option value="">Select Algorithm</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Button
      type="submit"
      variant="primary"
      className="w-100 mb-2"
      disabled={disabled}
    >
      Submit
    </Button>
    <Button
      type="button"
      variant="secondary"
      className="w-100"
      onClick={onReset}
    >
      Reset
    </Button>
  </Form>
);

export default AlgorithmForm;
