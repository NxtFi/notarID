import React from "react";
import { Spinner } from "./Spinner";
import { FaCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const ShowResponse = ({ showResponse, backToInitialState }) => {
	const handleCopyClipboard = (hashdoc) => {
		copy(hashdoc);
		toast.success("Copiado al portapapeles", {
			gutter: 1,
			id: "clipboard",
			duration: 1000,
			iconTheme: {
				primary: "black",
				secondary: "#fff",
			},
			className: " notify-copy animate__animated animate__fadeIn",
		});
	};

	return (
		<div className="hashed-output-response">
			<h4 className="hashed-algorithm-heading animate__animated animate__fadeIn animate__delay-.8s">
				{showResponse.sellado && showResponse.msg.includes("Documento sellado") && showResponse.msg}
			</h4>
			<div className="hashed-algorithm-container ">
				{showResponse.loading ? (
					showResponse.sellado && showResponse.data.timestamp ? (
						<div className="response-hashed-algorithm animate__animated animate__fadeIn animate__delay-.8s">
							<div className="field-resp ">
								<h3 className="response-heading">Hash del documento:</h3>
								<div className="resp-facopy">
									<p className="dochash-p">{showResponse.data.hashdoc}</p>
									<button onClick={() => handleCopyClipboard(showResponse.data.hashdoc)}>
										<FaCopy className="facopy" />
									</button>
								</div>
								<Toaster
									position="top-center"
									duration={1000}
									containerClassName=""
									containerStyle={{
										position: "absolute",
										top: "-1rem",
										fontWeight: "bold",
										pointerEvents: "none",
									}}
								/>
							</div>
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
	);
};

export default ShowResponse;
