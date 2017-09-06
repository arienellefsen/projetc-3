import React from 'react';
import Create from './Create';

const helpers = require("./utils/helpers");

class Main extends React.Component {

  render() {
    return (
      <div>
        <Create />
        <Map />
       </div>
    )
  }
}

export default Main;