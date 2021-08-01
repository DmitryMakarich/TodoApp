import React, { Fragment } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";

type State = {
  isAuthenticated: boolean;
  userName: string;
};

export class LoginMenu extends React.Component<{}, State> {
  _subscription = 0;

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(userName, profilePath, logoutPath);
    }
  }

  authenticatedView(userName: string, profilePath: string, logoutPath: any) {
    return (
      <Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-white" to={profilePath}>
            Hello {userName}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-white" to={logoutPath}>
            Logout
          </NavLink>
        </NavItem>
      </Fragment>
    );
  }

  anonymousView(registerPath: string, loginPath: string) {
    return (
      <Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-white" to={registerPath}>
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-white" to={loginPath}>
            Login
          </NavLink>
        </NavItem>
      </Fragment>
    );
  }
}