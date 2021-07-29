import { observer } from "mobx-react";
import React, { Component } from "react";
import Loader from "../../loader/loader";
import todoStore from "../../store/TodoStore";

const LoadingHOC = (WrappedComponent, props) => {
  @observer
  class LoadingHOC extends Component {
    
    render() {
      return (
          !todoStore.tasks[props.index].isReady ? (
            <div style={{
              position: "relative"
            }}>
              <Loader></Loader>
            </div>
          ) : (
            <WrappedComponent {...props}/>
          )
      );
    }
  }

  return LoadingHOC;
};

export default LoadingHOC;
