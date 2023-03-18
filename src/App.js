import logo from './logo.png';
import './App.css';
import NavigationBar from "./containers/NavigationBar/NavigationBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./containers/Home/Home";


import AddQuestion from "./containers/AddQuestion/AddQuestion";

function App() {


    return (
        <div className="App">
            <Router>
                <NavigationBar/>
                <div className="App-body">
                    <div >
                        <img className="logo" src={logo} alt="Logo"/>
                    </div>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/add' element={<AddQuestion/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
