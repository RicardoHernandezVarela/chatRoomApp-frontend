import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import io from 'socket.io-client';

import routes from './Routes';

/* SCREENS */
import Home from './screens/Home';
import Chat from './screens/Chat';

/* COMPONENTS */
import Navbar from './components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
    };

    this.ENDPOINT = 'localhost:5000';
  }

  componentDidMount() {
    this.setState({
      socket: io(this.ENDPOINT),
    });
  }

  componentWillUnmount() {
    const {socket} = this.state;

    socket.emit('disconnect');
    socket.off();
  }

  render() {
    const { socket } = this.state;

    return (
      <Router>
        <div className="bg-gray-200 w-screen h-screen m-0 p-0">
          <Navbar />
  
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home socket={socket} />} />
            <Route exact path={`${routes.CHAT}/:room_id/:room_name`} component={() => <Chat socket={socket} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
