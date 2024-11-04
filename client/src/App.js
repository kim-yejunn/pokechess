import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/game" component={GamePage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </Router>
    );
}

export default App;
