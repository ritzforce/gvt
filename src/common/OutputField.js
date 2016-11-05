import React from 'react';
import {Link} from 'react-router';
import {Table, Form, Glyphicon , Tooltip, FormGroup, Row, OverlayTrigger, Button} from 'react-bootstrap';
import {CheckedImage} from './../styles/images/checked.gif';
import {UncheckedImage} from './../styles/images/unchecked.gif';

export const IdLink = ({record, sObjectName}) => {
  return (
    <Link to={`/detail/${sObjectName}/${record.id}`}>{record.name}</Link>
  )
}

export const TdIdLink = ({record, sObjectName}) => {
  return (
    <td key={record.id}>
      <IdLink record={record} sObjectName={sObjectName}/>
    </td>
  );
}

export const CheckedBox = () => {
   return (
     <img src="/styles/images/checked.gif"/>
   )
}

export const UncheckedBox = () => {
  return (
    <img src="/styles/images/unchecked.gif" />
  )
}

export const HelpText = ({helpText}) => {
  const tooltip = (
    <Tooltip id="tooltip">{helpText}</Tooltip>
  );

  if(!helpText) {
    return <td width="20px">&nbsp;</td>
  }

   return (
     <td width="20px">
       <OverlayTrigger placement="top" overlay={tooltip}>
         <a href="javascript:void(0)"><Glyphicon glyph="info-sign"></Glyphicon></a>
       </OverlayTrigger>
     </td>
   )
}


class OutputField extends React.Component {

  render() {
    let currentField = this.props.field;
    let record = this.props.record;
    
    let clsName = (this.props.listView == true ? null: 'detailValue');
    
    if(currentField.name == 'name'){
      if(this.props.listView == true) {
        return (<TdIdLink record={record} sObjectName={this.props.sObjectName}/>);
      }
      return <td className={clsName}>{record[currentField.name]}</td>
    }

    if (currentField.formSubType == 'checkbox') {
        return(<td className={clsName}> {record[currentField.name] == true ? <CheckedBox/> : <UncheckedBox/> }</td>);
    }
    return <td className={clsName}> {record[currentField.name]}</td>
  }
}

OutputField.defaultProps = {
  listView: true
}

export default OutputField;
