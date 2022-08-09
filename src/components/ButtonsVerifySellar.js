import React from 'react'

const ButtonsVerifySellar = ({handleButtonSellar, handleButtonVerificar}) => {
  return (
    <div className="hashed-button animate__animated animate__fadeIn">
						<button className="verify-doc" type="button" onClick={handleButtonVerificar}>
							VERIFICAR
						</button>
						<button className="sellar-doc" type="button" onClick={handleButtonSellar}>
							SELLAR
						</button>
					</div>
  )
}

export default ButtonsVerifySellar
