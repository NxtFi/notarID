import React from 'react'
import { SpinnerDocHash } from './Spinner'

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
    <p className="file-name">Archivo: {file_Name}</p>
  </div>
  )
}

export default InfoDoc
