import Hashing from "./views/Hashing/Hashing";
import Navbar from "./components/Navbar/Navbar";
import Cert from "./views/Cert/Cert";
import Anexo from "./views/Anexo/Anexo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {
	return (
			<BrowserRouter>
					<div className="font-sans h-screen  flex flex-col items-center justify-center">
				<Navbar />
					<Routes>
						<Route path="/" element={<Hashing />} />
						<Route path="/certificado" element={<Cert />} />
						<Route path="/anexo" element={<Anexo />} />
					</Routes>
				<Footer />
				</div>
			</BrowserRouter>
	);
}

export default App;
