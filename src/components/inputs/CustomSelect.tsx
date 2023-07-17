import { useField } from "formik";

interface Props {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}

export const CustomSelect = ({ label, options, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col">
      <label className=" text-left">{label}</label>
      <select
        {...field}
        {...props}
        className="py-1 px-4 rounded-xl border border-[#94a3b8]"
        id="email-input"
        placeholder="usuario@mail.com"
      >
        <option label="Selecciona una opción" />
        {options?.map((option) => (
          <option key={option.value} value={option.value} className="text-xs">
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
};
