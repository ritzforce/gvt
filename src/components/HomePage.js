import React from 'react';
import {Link} from 'react-router';
import defaultState from '../defaultState';

import TabPanel from './../common/TabPanel';

const HomePage = () => {
  return (
    <div>

      <TabPanel selected={'home'}/>

      <h1>React Slingshot</h1>

      <h2>Get Started</h2>
      <span>Home Page</span>
      <ol>
        <li>Review the <Link to="fuel-savings">demo app</Link></li>
        <li>Remove the demo and start coding: npm run remove-demo</li>
      </ol>
    </div>
  );
};

export default HomePage;
