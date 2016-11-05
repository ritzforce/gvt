import React from 'react';

const LineTabs = ({displayTabs, selectedTab}) => {

  return (
    <div>
      <ul className="linetab-container">
        {displayTabs.map(tab => {
          let isSelected = (tab.name == selectedTab ? true : false);

          return <LineTabItem image={tab.image} title={tab.title} isSelected={isSelected}/>
        })}
      </ul>
    </div>
  );
}


const LineTabItem = ({image, title, isSelected}) => {

  let tagImage = null;
  if(image) {
    tagImage = <img src={image} />;
  }

  return (
    <li>
      <a href="javascript:void(0)" style={{textDecoration:'none'}} className={isSelected ? 'linetab linetab-active': 'linetab'}>
        {tagImage} {title}
      </a>
    </li>
  );
}

export default LineTabs;
