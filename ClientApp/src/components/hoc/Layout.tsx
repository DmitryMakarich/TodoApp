import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../navMenu/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div style={{
        background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)",
      }}>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
