import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import routes from './Routes';

/* SCREENS */
import Home from './screens/Home';
import Chat from './screens/Chat';

/* COMPONENTS */
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="bg-gray-200 w-screen h-screen m-0 p-0">
        <Navbar />

        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={`${routes.CHAT}/:room_id/:room_name`} component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
