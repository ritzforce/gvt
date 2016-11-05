import React from 'react';
import ConfirmModal from './ConfirmModal';

export const DeleteModal = ({record, name, handleActionLink}) => {
  let htmlBody = (<p>Are you sure you want to delete  <b>{name}</b> ? </p>);
  return (
      <ConfirmModal modalStyle={'danger'} title={'Confirm Delete ?'} body={htmlBody} buttonMode={'delete'} record={record} handleActionLink={handleActionLink} />
   );
}

export const DeleteModalButton = ({record, name, handleActionLink}) => {
  let htmlBody = (<p>Are you sure you want to delete  <b>{name}</b> ? </p>);
  return (
    <ConfirmModal modalStyle={'danger'} title={'Confirm Delete ?'} renderAsLink={false}  linkText={"Delete"}
                  body={htmlBody} buttonMode={'delete'} record={record} handleActionLink={handleActionLink} />
  );
}


DeleteModal.defaultProps = {
  record: {name: 'Ritesh Gupta',id: 1},
  name: 'Ritesh Gupta'
}

export const ActivateModal = ({record, name, handleActionLink}) => {
  let htmlBody = (<p>Are you sure you want to activate  <b>{name}</b> ? </p>);
  return (
    <ConfirmModal linkText={'Activate'} modalStyle={'success'} title={'Confirm Activation ?'} body={htmlBody} buttonMode={'activate'} record={record} handleActionLink={handleActionLink} />
  );
}

ActivateModal.defaultProps = {
  record: {name: 'Ritesh Gupta',id: 1},
  name: 'Ritesh Gupta'
}


export const DeactivateModal = ({record, name, handleActionLink}) => {
  let htmlBody = (<p>Are you sure you want to deactivate  <b>{name}</b> ? </p>);
  return (
    <ConfirmModal linkText={'Deactivate'} modalStyle={'danger'} title={'Confirm Deactivation ?'} body={htmlBody} buttonMode={'deactivate'} record={record} handleActionLink={handleActionLink} />
  );
}

DeactivateModal.defaultProps = {
  record: {name: 'Ritesh Gupta',id: 1},
  name: 'Ritesh Gupta'
}


