import { useField } from "formik";

interface Props {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

export const CustomInput = ({ label, type, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className=" text-left">{label}</label>
      <input
        {...field}
        {...props}
        type={type}
        className="py-1 px-4 rounded-xl border border-[#94a3b8]"
        id="email-input"
        placeholder="usuario@mail.com"
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </>
  );
};
