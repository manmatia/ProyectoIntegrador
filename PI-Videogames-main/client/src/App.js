import './App.css';
import Detail from "./Views/Detail/detail.component";
import Create from './Views/Create/create.component';
import Home from './Views/Home/home.component';
import {Route, Switch , BrowserRouter} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <div >
      <Switch>

      <Route exact path="/" component={Home} />
      <Route path="/detail/" component={Detail} />
      <Route path="/create" component={Create} />
      
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
