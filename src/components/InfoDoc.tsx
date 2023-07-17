import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { fileInfo } from "../helpers/interfaces";

const InfoDoc = ({ file }: { file: fileInfo }) => {
  return (
    <div className="items-center md:p-5 p-3  bg-slate-200 overflow-auto max-md:w-full">
      <div className="flex gap-5">
        <FontAwesomeIcon className="h-8 text-[#92b0a6]" icon={faFileZipper} />
        <div className="text-left ">
          <p className="file-name ">{file.file.name}</p>
          <p className="text-xs">Hash: {file.hash} </p>
        </div>
      </div>
    </div>
  );
};

export default InfoDoc;
