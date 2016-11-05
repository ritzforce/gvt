import React from 'react';

export const Loading = ({height, width, loadingText}) => {
  return (

    <div className="text-center" style={{height: height, width: width,verticalAlign:'middle'}}>
      <img src="/styles/images/loading32.gif" /> {loadingText}
    </div>
  )
}

Loading.defaultProps = {
  height: 300,
  width: '100%',
  loadingText: 'Loading...'
};

export default Loading;

