import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login-Register/login';
import ChurrasView from './components/Groups/churrasview';
import NewChurrasView from './components/Groups/newchurrasview';
import Members from './components/Groups/membersview';
import UseContext from './usecontext';
import './App.css';

function App() {

  // Variável global com informação do e-mail e token
  const [ user, setUser ] = useState();

  //Aplicação com rotas -- Não da problema nos retornos
  return (
    <div className="App">
      <Router>
        <UseContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/churras' component={ChurrasView}/>
            <Route path='/newchurras' component={NewChurrasView}/>
            <Route path='/members' component={Members}/>
          </Switch>
        </UseContext.Provider>
      </Router>
    </div>
  );
}

export default App;
