import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileZipper } from "@fortawesome/free-regular-svg-icons";

const InfoDoc = ({ output, file_Name }) => {
  return (
      <div className="items-center md:p-5 p-3  bg-slate-200 overflow-auto max-md:w-full">
        <div className="flex gap-5">
          <FontAwesomeIcon className="h-8 text-[#92b0a6]" icon={faFileZipper} />
          <div className="text-left ">
            <p className="file-name ">{file_Name}</p>
            {
              output.loading && (
                <p className="text-xs">Hash: {output.dochash} </p>
              )
            }
          </div>
        </div>
        {
          !output.loading &&(
            <div className="bg-green-400 mt-3 rounded-xl text-[10px] text-white ">cargando</div>
          )
        }
        
      </div>
  );
};

export default InfoDoc;
