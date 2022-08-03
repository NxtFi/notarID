import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ShowResponse from "../components/ShowResponse";
import { verifyDoc } from "../helpers/requestApi";

const HashDoc = () => {
  let navigate = useNavigate();
	//save result
	const [showResponse, setResponse] = useState({
		msg: "Sin resultado",
		data: {},
		sellado: false,
		loading: false,
	});
	const [result, setResult] = useState(false);

	//Get params <hashDoc>
	let { hashDoc } = useParams();
 const backToInitialState = ()=>{
  //go to home
  navigate('/');
 }
	useEffect(() => {
		const getData = () => {
			if (hashDoc!== undefined) {
				verifyDoc(setResponse, setResult, hashDoc);
			}
		};
		getData();
	}, [hashDoc]);

	return (
		<div className="container">
			<div className="container-content">
				<ShowResponse showResponse={showResponse} backToInitialState={backToInitialState}/>
			</div>
		</div>
	);
};

export default HashDoc;
