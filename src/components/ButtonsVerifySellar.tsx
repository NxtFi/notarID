import React from 'react'

const ButtonsVerifySellar = ({handleButtonSellar, handleButtonVerificar}) => {
  return (
    <div className="flex gap-5 justify-center mt-4">
						<button className="transition duration-150 ease-in-out p-2 bg-[#278cee] rounded-md text-white hover:bg-white hover:text-[#278cee]" type="button" onClick={handleButtonVerificar}>
							Verificar
						</button>
						<button className="transition duration-150 ease-in-out p-2 bg-[#278cee] hover:bg-white hover:text-[#278cee] text-white rounded-md   " type="button" onClick={handleButtonSellar}>
							Sellar
						</button>
					</div>
  )
}

export default ButtonsVerifySellar
