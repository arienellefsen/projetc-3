import React from 'react';
import Create from './Create';
import Map from './Map';

const helpers = require("./utils/helpers");

class Main extends React.Component {

  render() {
    return (
      <div>
        <Create />
       </div>
    )
  }
}

export default Main;