import React from 'react';
import Detail from "./Views/Detail/detail.component";
import Create from './Views/Create/create.component';
import Home from './Views/Home/home.component';
import Landing from "./Views/Landing/landing.component"
import {Route, Switch , BrowserRouter} from "react-router-dom"
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div >
      <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={Detail} />
      <Route exact path="/create" component={Create} />
      <Route exact path="*" component={Home} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
