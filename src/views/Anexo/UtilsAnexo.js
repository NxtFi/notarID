
// const [emailError, setEmailError] = useState("Ingrese un Email");
// const [emailOk, setEmailOk] = useState(false);
// const [emailDir, setEmailDir] = useState("");
// let [file_Name, setFileName] = useState("");
// let [output, setOutput] = useState({ dochash: "", loading: false });
// const [showMessage, setShowMessage] = useState(false);
// const [activeAnimationDrag, setActiveAnimationDrag] = useState(false);
// const [showResult, setResult] = useState(false);
// const [showResponse, setResponse] = useState({
//   msg: "Sin resultado",
//   data: {},
//   sellado: false,
//   loading: false,
// });


// const [inputs, setInputs] = useState({});
// export const handleChange = (event) => {
//   const name = event.target.name;
//   const value = event.target.value;
//   setInputs((values) => ({ ...values, [name]: value }));
// };
// // console.log(file_input)
// //For handling text input
// export const handleEmailInput = async (e) => {
//   // Get the value
//   var email = e.target.value;

//   if (validator.isEmail(email)) {
//     setEmailError("Ingrese un Email");
//     setEmailOk(true);
//   } else {
//     setEmailError("Ingrese un Email válido!");
//     setEmailOk(false);
//   }
//   setEmailDir(email);
// };

// //For handling file input
// export const handleFileInput = (e) => {
//   e.preventDefault();
//   setOutput({ dochash: "", loading: false });
//   setShowMessage(false);

//   // Initializing the file reader
//   const fr = new FileReader();

//   // Listening to when the file has been read.
//   fr.onload = async () => {
//     let result = "";
//     // Hashing the content based on the active algorithm

//     result = await sha256(fr.result);

//     // Setting the hashed text as the output
//     setOutput({ dochash: result, loading: true });

//     // Setting the content of the file as file input
//     e.target.value = null;
//   };

//   setShowMessage(true);
//   // Reading the file.
//   fr.readAsText(e.target.files[0]);
//   setFileName(e.target.files[0].name);
//   // console.log(e.target.files[0].name);
// };

// export const handleFileDragDrop = (e) => {
//   // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
//   e.preventDefault();
//   setActiveAnimationDrag(false);
//   setShowMessage(false);
//   setOutput({ dochash: "", loading: false });

//   if (e.dataTransfer.files) {
//     // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
//     for (let i = 0; i < e.dataTransfer.files.length; i++) {
//       let file = e.dataTransfer.files[i];
//       // console.log("... file[" + i + "].name = " + file.name);
//       setFileName(file.name);

//       const fr = new FileReader();
//       fr.readAsText(e.dataTransfer.files[i]);

//       fr.onload = async () => {
//         let result = "";
//         result = await sha256(fr.result);
//         // Setting the hashed text as the output
//         setOutput({ dochash: result, loading: true });

//         // Setting the content of the file as file input
//       };
//       setShowMessage(true);
//     }
//   } else {
//     // Usar la interfaz DataTransfer para acceder a el/los archivos
//     for (let i = 0; i < e.dataTransfer.files.length; i++) {
//       // console.log("... file[" + i + "].name = " + e.dataTransfer.files[i].name);
//     }
//   }
// };

// export const handleFileDragOver = (e) => {
//   setActiveAnimationDrag(true);
//   //console.log('File(s) in drop zone');
//   // Prevent default behavior (Prevent file from being opened)
//   e.preventDefault();
// };

// export const handleButtonVerificar = (e) => {
//   // GET (Request).
//   verifyDoc(setResponse, setResult, output.dochash);
//   setResult(true);
// };

// export const handleButtonSellar = async (e) => {
//   let data_raw = "{";
//   data_raw += '"email":"';
//   data_raw += emailDir;
//   data_raw += '",';
//   data_raw += '"block":{"data":"// IMPORT ';
//   data_raw +=
//     "e4e9cdbc983681154f8c11abb07b8a90b2f9afd6b9c452337d98a5661d7ffc69"; // smart contract
//   data_raw += '\\n {\\"hash\\":\\"';
//   data_raw += output.dochash; //doc hash
//   data_raw +=
//     '\\"}","by":"NOTARIO","scope":"e4e9cdbc983681154f8c11abb07b8a90b2f9afd6b9c452337d98a5661d7ffc69"}}';
//   sellarDoc(setResponse, setResult, output.dochash, data_raw);
//   setShowMessage(false);
// };

// export const backToInitialState = (e) => {
//   setOutput({ dochash: "", loading: false });
//   setResponse({});
//   setResult(false);
//   setShowMessage(false);
//   setEmailOk(false);
//   setEmailDir("");
//   setInputs({});
//   setEmailError("Ingrese un Email");
// };


