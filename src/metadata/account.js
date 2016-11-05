/*****************************************************************************
 * Account Metadata file, all user forms and listviews are driven from here.
 Be careful while editing the file
 **************************************************************************/
const account = {
  theme: {
    label: 'Account',
    themeColor: '#EFEFDC',
    pluralLabel: 'Accounts',
    image: '/styles/images/account32.png',
    showNew: true,
    description: 'Manage all our customers',
    listViewActions: [
      {action: 'Delete'},
      {action: 'Edit'}
    ],
    massActions: [
      {action: 'action1',label: 'Action 1', buttonType: 'warning',
        description:'Do a Mass Action on Accounts for Action 1'},
      {action: 'action2',label: 'Action 2', buttonType: 'warning',
        description:'Do a Mass Action on Accounts for Action 2'},
    ],
    detailActions: [
    ]
  },
  listView: [
    {name: 'name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'active', label: 'Active', sorted: true, datatype: 'boolean', formSubType: 'checkbox'},
    {name: 'address', label: 'Address', sorted: true, datatype: 'String', formSubType: 'textarea'}
  ],
  detailView: [
    {
      name: 'Basic Information',
      cols: 2,
      fields: [
        {
          name: 'name', label: 'Name', required: true, datatype: 'String', formType: 'input', helpText: 'Name of' +
        ' the Client'
        },
        {name: 'active', label: 'Active', required: false, datatype: 'boolean', formType: 'checkbox', formSubType: 'checkbox'},
      ],
    },
    {
      name: 'Details',
      cols: 2,
      fields: [
        {
          name: 'address',
          label: 'Address',
          required: false,
          datatype: 'String',
          formType: 'textarea',
          formSubType: '',
          helpText: 'Address of the client, where the machine is installed'
        }
      ],
    }
  ],
  detailViewRelatedLists: [
    {
      sObjectName: 'workOrder',
      listActions: [
        {action: 'Delete'},
        {action: 'Edit'}
      ],
      massActions: [
        {action: 'Action1',label: 'Mass Email', buttonType: 'warning'},
        {action: 'Action2',label: 'Mass Delete', buttonType: 'warning'},
        {action: 'Action3',label: 'Mass Mass', buttonType: 'warning'}
      ],
      fields:[
        {name: 'name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
        {name: 'active', label: 'Active', sorted: true, datatype: 'boolean', formSubType: 'checkbox'},
        {name: 'status', label: 'Status', sorted: true, datatype: 'String', formSubType: 'select'},
        {name: 'dueDate', label: 'Due Date', sorted: true, datatype: 'date', formSubType: 'date'}
      ]
    },
  ]
};

export default account;
