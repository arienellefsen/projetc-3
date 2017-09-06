import React from 'react';
import Create from './Create';

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