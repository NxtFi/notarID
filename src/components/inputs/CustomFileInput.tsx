import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import { useState } from "react";

interface props {
  showMessage: boolean;
  showResult: boolean;
  name: string;
}

export const CustomFileInput = ({
  showMessage,
  showResult,
  ...props
}: props) => {
  const [animationDrag, setAnimationDrag] = useState(false);

  const [field] = useField(props);

  return (
    <>
      <div
        className={`${
          animationDrag ? "bg-[#79b6f3] text-white border-white" : ""
        } p-7 border-2 border-dashed transition-all duration-300 ease-in-out max-md:hidden`}
        onDragLeave={() => setAnimationDrag(false)}
      >
        <FontAwesomeIcon className=" text-xl" icon={faUpload} />
        <p className="mt-2 text-md font-medium">
          Arrastre y suelte el documento ...
        </p>
      </div>
      <div className="mb-4  flex flex-col">
        <label
          htmlFor="file-input"
          className={`${
            showMessage && !showResult && "bg-slate-200 text-[#278cee]"
          }transition-all duration-200 strecth cursor-pointer text-md text-white font-medium p-2 rounded-md bg-[#278cee] hover:bg-slate-200 hover:text-[#278cee]`}
        >
          Selecciona archivo
        </label>
        <input
          type="file"
          className="hidden"
          id="file-input"
          {...field}
          {...props}
        />
      </div>
    </>
  );
};
