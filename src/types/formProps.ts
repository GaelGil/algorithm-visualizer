export type FormProps = {
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  disabled?: boolean;
};
