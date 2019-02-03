import React from "react";
export const Spinner = (props) => (

  <div>
    {
      props.spin && <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    }
  </div>
);
