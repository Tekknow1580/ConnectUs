import * as React from 'react';
import {Routes} from 'react-router-dom';
import {Route} from 'react-router'
import Login from './Views/Login';
import SignUp from './Views/SignUp';
import Main from './Views/Main';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Main' element={<Main/>}/>
    </Routes>
  );
}

export default App;