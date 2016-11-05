/**
 * Created by Ritesh on 8/31/2016.
 */
const defaultState = {
  displayTabs: [
    {
      name: 'home',
      title: 'Home',
      image: '/styles/images/home24.png',
      url: '',
      index: 0
    },
    {
      name: 'account',
      title: 'Accounts',
      image: '/styles/images/account24.png',
      url: '/list/account',
      index: 1,
    },
    {
      name: 'announcement',
      title: 'Announcements',
      image: '/styles/images/announcement24.png',
      url: '/list/announcement',
      index: 3,
    },
    {
      name: 'user',
      title: 'Users',
      url: '/list/user',
      image: '/styles/images/user24.png',
      index: 4,
    },
    {
      name: 'maps',
      title: 'Maps',
      image: '/styles/images/maps24.png',
      url: 'maps', index: 5
    }
  ],

  metadata: {
    account: {
      theme: {
        label: 'Account',
        themeColor: '#E2E7EF',
        pluralLabel: 'Accounts',
        icon: 'fa fa-suitcase',
        image: '/styles/images/account32.png',
        showNew: true
      },
      listView: [
        {name: 'name', label: 'Name', sorted: true, datatype: 'String'},
        {name: 'address', label: 'Address', sorted: false, datatype: 'String'},
        {name: 'active', label: 'Active', sorted: false, datatype: 'boolean'},
        {name: 'startdate', label: 'Start Date', sorted: false, datatype: 'Date'}
      ],
      detailView: [
        {
          name: 'Information',
          cols: 2,
          fields: [
            {name: 'name', label: 'Name', datatype: 'String', formType: 'text'},
            {name: 'address', label: 'Address', datatype: 'textarea', formType: 'textarea'},
            {name: 'startdate', label: 'Start Date', datatype: 'Date', formType: 'text'}
          ],
        },
        {
          name: 'System Information',
          cols: 1,
          fields: [
            {name: 'active', label: 'Active', datatype: 'boolean', formType: 'checkbox'}
          ],
        }
      ]
    },
    announcement: {
      theme: {
        label: 'Announcement',
        themeColor: '#EEDAC1',
        pluralLabel: 'Announcements',
        icon: 'fa fa-suitcase',
        image: '/styles/images/account32.png',
        showNew: true,
        listViewActions: [
          {action:'Delete'},
          {action:'Deactivate'},
          {action:'Activate'}
        ]
      },
      listView: [
        {name: 'name', label: 'Name', sorted: true, datatype: 'String'},
        {name: 'description', label: 'Description', sorted: false, datatype: 'String'},
        {name: 'active', label: 'Active', sorted: false, datatype: 'boolean'},
        {name: 'startdate', label: 'Start Date', sorted: false, datatype: 'Date'}
      ],
      newView: [
        {
          name: 'Information',
          cols: 2,
          fields: [
            {
              name: 'name', label: 'Title', datatype: 'String', formType: 'input', formSubType: 'text',
              maxLength: 80, helpText: 'Please enter a short Title', placeholder: 'Announcement Title'
            },
            {
              name: 'startdate', label: 'Start Date', datatype: 'Date', formType: 'input', formSubType: 'date',
              helpText: 'Start Date for the Announcement', placeholder: 'Announcement Start Date'
            }
          ],
        },
        {
          name: 'Details',
          cols: 1,
          fields: [
            {
              name: 'description', label: 'Description', datatype: 'textarea', formType: 'textarea',
              placeholder: 'Details about the Annoucement'
            },
          ],
        },
        {
          name: 'Other',
          cols: 1,
          fields: [
            {
              name: 'active', label: 'Active', datatype: 'boolean', formType: 'checkbox',
              placeholder: 'Details about the Annoucement'
            },
            {
              name: 'type', label: 'Type', datatype: 'string', formType: 'select', helpText: 'Select',
              picklistValues: [{name: '1', label: 'Red'}, {name: '2', label: 'Yellow'}]
            },
          ],
        }
      ]
    },
    user: {
      theme: {
        label: 'User',
        themeColor: '#E2EAE1',
        pluralLabel: 'Users',
        image: '/styles/images/user32.png',
        showNew: true,
        description: 'Manage all users of the application',
        listViewActions: [
          {action:'Delete'},
          {action:'Deactivate'},
          {action:'Activate'}
        ],
        massActions: [
          {action: 'Action 1'},
          {action: 'Action 2'},
          {action: 'Action 3'}
        ],
        detailActions: [
          {action: 'reset', label:'Reset Password', buttonType:'warning'},
          {action: 'email', label:'Email',buttonType: 'warning'},
        ]
      },
      listView: [
        {name: 'name', label: 'Name', sorted: true, datatype: 'String',formSubType:'text'},
        {name: 'active', label: 'Active', sorted: true, datatype: 'boolean',formSubType:'checkbox'},
        {name: 'username', label: 'Name', sorted: true, datatype: 'String',formSubType:'text'},
        {name: 'email', label: 'Email', sorted: false, datatype: 'String',formSubType:'email'},
        {name: 'mobile', label: 'Mobile', sorted: false, datatype: 'String',formSubType:'text'},
        {name: 'role', label: 'Role', sorted: false, datatype: 'String',formSubType:'text'}
      ],
      detailView: [
        {
          name: 'Information',
          cols: 2,
          fields: [
            {name: 'name', label: 'Name', required: true, datatype: 'String', formType: 'input', helpText: 'Name of' +
            ' the User'},
            {name: 'email', label: 'Email', required: true, datatype: 'email', formType: 'input', formSubType:'email'},
            {name: 'mobile', label: 'Mobile', required: true, datatype: 'String', formType: 'input'}
          ],
        },
        {
          name: 'Details',
          cols: 2,
          fields: [
            {name: 'username', label: 'Username', required:true, datatype: 'String', formType: 'input', formSubType:'email', helpText: 'Username'},
            {name: 'role', label: 'Role', datatype: 'String', formType: 'select',
              picklistValues: [{name: 'Admin', label: 'Admin'}, {name: 'User', label: 'User'}]},
            {name: 'active', label: 'Active', datatype: 'Boolean',formType: 'checkbox',formSubType:'checkbox'}
          ],
        }
      ]
    },

  }

};

export default defaultState;
