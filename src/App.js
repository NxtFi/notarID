import Hashing from './components/hashing';
import Navbar from './components/Navbar';
import Cert from './components/cert.js';
import Anexo from './components/anexo.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Hashing/>} />
          <Route path="/certificado" element={<Cert/>} />
          <Route path="/anexo" element={<Anexo/>} />
        </Routes>
      </BrowserRouter>       
    </div>
  );
}

export default App;
