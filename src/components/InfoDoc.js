import React from 'react'
import { SpinnerDocHash } from './Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileZipper } from '@fortawesome/free-regular-svg-icons'

const InfoDoc = ({output,file_Name}) => {
  return (
    <div className="hashed-output animate__animated animate__fadeIn">
    <h4 className="hashed-algorithm-heading">Hash del archivo</h4>
    <div className="hashed-algorithm-container">
      <div className="hashed-algorithm-text">
        {output.loading ? (
          output.dochash
        ) : (
          <div className="spinnerDochash">
            <SpinnerDocHash />
          </div>
        )}
      </div>
    </div>
    <div className='flex gap-5  items-center p-5 bg-slate-200'>
      <FontAwesomeIcon className='h-8 text-[#92b0a6]' icon={faFileZipper}/>
      <p className="file-name ">{file_Name}</p>
    </div>
    
  </div>
  )
}

export default InfoDoc
