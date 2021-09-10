import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import io from 'socket.io-client';

import routes from './Routes';

/* SCREENS */
import Home from './screens/Home';
import Chat from './screens/Chat';
import Signup from './screens/Signup';
import Login from './screens/Login';

/* COMPONENTS */
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: {},
    };

    this.ENDPOINT = 'localhost:5000';
  }

  componentDidMount() {
    // TRY TO CONNECT TO THE SERVER, attempts: 5
    const connectionToSocket = io(this.ENDPOINT, {reconnectionAttempts: 5});
    this.setState({
      socket: connectionToSocket,
    });
  }

  componentWillUnmount() {
    const {socket} = this.state;

    if (socket && socket.connected) {
      socket.emit('disconnect');
      socket.off();
    }
  }

  render() {
    const { socket } = this.state;

    return (
      <Router>
        <div className="flex bg-gray-200 w-screen h-screen m-0 p-0">
          <Sidebar socket={socket} />
  
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home socket={socket} />} />
            <Route exact path={`${routes.CHAT}/:room_id/:room_name`} component={() => <Chat socket={socket} />} />
            <Route exact path={routes.SIGNUP} component={Signup} />
            <Route exact path={routes.LOGIN} component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
