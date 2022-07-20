import * as React from 'react';
import Main from './Main';
import Login from './Login';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router'

function App() {
  return (
    <Routes>
        <Route path='/Main' element={<Main/>}></Route>
        <Route path='/' element={<Login/>}></Route>
    </Routes>
  );
}

export default App;