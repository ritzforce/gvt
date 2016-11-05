import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Header from './../common/Header';
import {FluidPanel, TabPanel, Footer} from './../common/Navigation';


const App = (props) => {
  return (
    <div>
      <Header />
      <FluidPanel>
        {props.children}
      </FluidPanel>

      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
