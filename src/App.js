import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import  createMuiTheme  from '@material-ui/core/styles/createMuiStrictModeTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';

//components 
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false;
    window.location.href = '/login';
  } else {
    authenticated = true;
  }
}

class App extends Component{
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home}/>
                  <AuthRoute 
                  exact 
                  path="/login" 
                  component={login} 
                  authenticated={authenticated}/>
                  <AuthRoute 
                  exact 
                  path="/signup" 
                  component={signup} 
                  authenticated={authenticated}/>
                </Switch>
              </div>
            </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
