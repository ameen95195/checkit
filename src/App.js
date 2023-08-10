import logo from './logo.png';
import './App.css';
import NavigationBar from "./containers/NavigationBar/NavigationBar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./containers/Home/Home";


import AddMaterial from "./containers/AddMaterial/AddMaterial";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";
import {sendQuestionGPT} from "./utils/chatGPT-api";
import {preTextGPTExplination} from "./utils/consts";
import {useEffect} from "react";

const theme = createTheme({
    palette: {

        primary: {
            light: '#36c924',
            main: '#73d263',
            dark: '#aaff50',
            contrastText: '#000',
        },
        secondary: {
            light: '#ff7961',
            main: '#946e6d',
            dark: 'rgba(146,101,100,0.56)',
            contrastText: '#fff',

        },
        cardPrimary: {
            main: '#aa3321',
            contrastText: '#fff',
        }
    },
    direction: 'ltr',
});

function App() {


    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <div className="App">
                <Router>
                    <NavigationBar/>
                    <div className="App-body">
                        <div>
                            <img className="logo" src={logo} alt="Logo"/>
                        </div>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/add' element={<AddMaterial/>}/>
                        </Routes>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
