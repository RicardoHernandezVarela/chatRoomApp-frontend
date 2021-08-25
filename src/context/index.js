import React from "react";

export const UserContext = React.createContext(null);

export class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      chatRooms: [],
    };
  }

  setUser = (user) => {
    this.setState({user: user});
  };

  setChatRooms = (chatRooms) => {
    this.setState({chatRooms: chatRooms});
  };

  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        actions: {
          setUser: this.setUser,
          setChatRooms: this.setChatRooms
        }
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const Consumer = UserContext.Consumer;
