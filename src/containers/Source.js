import React from "react";
import {Component} from "react";

export default class Source extends Component{

  render(){
    return(
      <div className="overflow-auto">
        <p className="medium-line-spacing big-text color-gray">
          <strong>Maximillian Swartzmuller (41)</strong>
        </p>
        <ul className="source-items-list">
          <li>
            <a target="_blank" href="http://google.com"  className="source-link small-line-spacing" >
              <p className="color-gray">This is some description</p>
              <strong className="color-red">https://www.youtube.com/watch?v=esnrfyXrC7A</strong>
            </a>
          </li>

          <li>
             <a target="_blank" href="http://google.com"  className="source-link small-line-spacing" >
               <p className="color-gray">This is some description</p>
               <strong className="color-red">https://react-icons.netlify.com/#/icons/fa</strong>
             </a>
           </li>

          <li>
            <a target="_blank" href="http://google.com"  className="source-link small-line-spacing" >
              <p className="color-gray">This is some description</p>
              <strong className="color-red">https://react-icons.netlify.com/#/icons/fa</strong>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

