import React from "react";

class Users extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        users: []
      };
    }

    componentDidMount() {
      fetch("https://api.github.com/users?since=10")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              users: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() {
      const { error, isLoaded, users } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        const listUsers = users.map(user => (
          <div className="media" key={user.id}>
            <img src={user.avatar_url} className="mr-3" alt="..." weight="42" height="42" />
            <div className="media-body">
              <h5 className="mt-0"><a href={user.html_url}>{user.login}</a></h5>
            </div>
          </div>
        ))
        return (
          <div>
            {listUsers}
          </div>
        );
      }
    }
  }

  export default Users;
