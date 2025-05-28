import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Main from './components/pages/Main';
import General_Menu from './components/common/General_Menu';





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
                <Route path="/4" element={<General_Menu  />} />



                

            </Routes>
        </Router>
    );
}

export default App;
