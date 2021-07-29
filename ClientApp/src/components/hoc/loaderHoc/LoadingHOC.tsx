import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Loader from "../../loader/loader";
import todoStore from "../../store/TodoStore";

const LoadingHOC = (WrappedComponent) => {
  @observer
  class LoadingHOC extends Component {
    componentDidMount() {
      setTimeout(() => {
        fetch("/todo/todos", {
          method: "GET",
        }).then((x) =>
          x.json().then((y) => {
            todoStore.init(y);
          })
        );
      }, 1000);
    }

    render() {
      return (
        <div>
          {todoStore.tasks.length === 0 ? (
            <Loader></Loader>
          ) : (
            <WrappedComponent {...this.props} />
          )}
        </div>
      );
    }
  }

  return LoadingHOC;
};

export default LoadingHOC;
