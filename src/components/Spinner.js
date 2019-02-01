import React from "react";
export const Spinner = (props) => (

  <div>
    {
      props.spin && <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    }
  </div>
);
