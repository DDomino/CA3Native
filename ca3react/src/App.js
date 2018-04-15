import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch, NavLink, WithRouter } from "react-router-dom";
import facade from "./ApiFacade";
import ShipTable from "./ShipTable";
import PersonTable from "./PersonTable";
import PlanetTable from "./PlanetTable";




// -------------------------------------------------- LOGIN ------------------------------------------//
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }

  }
  login = (evt) => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);


  }
  onChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange} >
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login</button>
        </form>
      </div>
    )
  }
}

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }

  componentDidMount() { }

  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    )
  }
}


const Welcome = ({ match }) => (
  <div>
    <h1>Welcome to CA3!</h1>
  </div>
)

// --------------------------------------------- APP -------------------------------------------------//
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: false,
                   resultList: "empty" }

  };

  logout = (user, pass) => {
    facade.logout(user, pass)
    this.setState({ loggedIn: false });
  }
  login = (user, pass) => {
    facade.login(user, pass)
      .then(res => this.setState({ loggedIn: true }));

  }


  





  render() {
    return (
      <Router>
        <Switch>
          <div>
            <ul>
              <li><NavLink exact to="/">Welcome</NavLink></li>
              <li><NavLink to="/loginPage">Login</NavLink></li>
            </ul>

            <Route exact path="/" render={() => <div><Welcome /></div>} />
            <Route path="/spaceships" render={() => <div><ShipTable facade={facade} /></div> }/>
            <Route path="/persons" render={() => <div><PersonTable facade={facade} /></div> }/>
            <Route path="/planets" render={() => <div><PlanetTable facade={facade} /></div> }/>

            <Route path="/loginPage" render={() => <div>
      
          

              {!this.state.loggedIn ? (<LogIn login={this.login} />) :
                (<div>
                  <LoggedIn />
                 
                 
                  <button onClick={this.logout}>Logout</button>
                  <Switch>
                    <div>
                      <ul>
                        <li><NavLink exact to="/spaceships">Show Spaceships</NavLink></li>
                        <li><NavLink exact to="/persons">Show Persons</NavLink></li>
                        <li><NavLink exact to="/planets">Show Planets</NavLink></li>
                      </ul>
                    </div>
                  </Switch>

             
                </div>)}
            </div>} />
            
          </div>
        </Switch>
      </Router>
    )
  }
}
export default App;


