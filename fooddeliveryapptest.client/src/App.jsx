import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Main from './components/pages/Main';





function App() {
    return (
        <Router>
            <Routes>

                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/1" element={<Header />} />
                <Route path="/2" element={<Navbar />} />
                <Route path="/3" element={<Footer />} />
                <Route path="/" element={<Main />} />





            </Routes>
        </Router>
    );
}

export default App;
