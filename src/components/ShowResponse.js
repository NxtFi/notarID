import React from 'react'
import Spinner from './Spinner';

const ShowResponse = ({showResponse, backToInitialState}) => {
  return (
    <div className="hashed-output-response">
    <h4 className="hashed-algorithm-heading animate__animated animate__fadeIn animate__delay-.8s">{showResponse.sellado && showResponse.msg.includes('Documento sellado') && showResponse.msg}</h4>
    <div className="hashed-algorithm-container ">
      {showResponse.loading ? (
        showResponse.sellado && showResponse.data.timestamp ? (
          <div className="response-hashed-algorithm animate__animated animate__fadeIn animate__delay-.8s">
            <div className="field-resp ">
              <h3 className="response-heading">Hash del bloque:</h3>
              <p>{showResponse.data.hash}</p>
            </div>
            <div className="field-resp">
              <h3 className="response-heading">Timestamp:</h3>
              <p>{showResponse.data.timestamp}</p>
            </div>
            <div className="field-resp ">
              <h3 className="response-heading">Fecha y hora:</h3>
              <p>{showResponse.data.date}</p>
            </div>
          </div>
        ) : (
          <div className="res-msg animate__animated animate__fadeIn animate__delay-8s">
            <p className="hashed-algorithm-text">{showResponse.msg}</p>
          </div>
        )
      ) : (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <button type="button" className="again-button" onClick={backToInitialState}>
        Volver a verificar/sellar
      </button>
    </div>
  </div>
  )
}

export default ShowResponse
