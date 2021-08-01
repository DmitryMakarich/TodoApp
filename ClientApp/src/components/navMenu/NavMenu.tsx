import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import todoStore from "../store/TodoStore"
import { LoginMenu } from '../api-authorization/LoginMenu';
import './NavMenu.css';
import { observer } from 'mobx-react';

@observer
class NavMenu extends Component<any, any> {
  
  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    todoStore.showCompleted()
    event.preventDefault();
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar
          style={{
            background: "rgb(79, 132, 172)"
          }} 
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand style={{  color: "white",}} tag={Link} to="/">Todos</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/tasks">Tasks</NavLink>
                </NavItem>
                <LoginMenu >
                </LoginMenu>
                <form className="form-inline" style={{
                  marginLeft: "50px"
                }}
                  onSubmit={this.handleSubmit}
                >
                  <input 
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(event) => todoStore.setSearchValue(event.target.value)}
                  />
                  <button
                    style={{background: "orange"}}
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                    >
                      Completed
                  </button>
                </form>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default NavMenu