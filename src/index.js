import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'src/containers/root';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import './stylesheets';

const App = () => (
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
