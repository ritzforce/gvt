const workOrder = {
  theme: {
    label: 'Work Order',
    themeColor: '#E0DBF0',
    pluralLabel: 'Work Orders',
    image: '/styles/images/workorder32.png',
    showNew: true,
    description: 'All Work Orders serviced by technicians',
    listViewActions: [
      {action: 'Delete'},
      {action: 'Edit'}
    ],
    detailActions: [
      {action: 'customaction1', label: 'Work order Action 1', buttonType: 'warning'}
    ]
  },
  listView: [
    {name: 'name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'active', label: 'Active', sorted: true, datatype: 'boolean', formSubType: 'checkbox'},
    {name: 'status', label: 'Status', sorted: true, datatype: 'String', formSubType: 'select'},
    {name: 'dueDate', label: 'Due Date', sorted: true, datatype: 'date', formSubType: 'date'}
  ],
  detailView: [
    {
      name: 'Information',
      cols: 2,
      fields: [
        {
          name: 'name', label: 'Name', required: true, datatype: 'String', formType: 'input', helpText: 'Name of' +
        ' the Workorder'
        },
        {name: 'active', label: 'Active', datatype: 'Boolean', formType: 'checkbox', formSubType: 'checkbox'},
        {
          name: 'status', label: 'Status', required: true, sorted: true, datatype: 'String', formType: 'select',
          picklistValues: [{name: 'Scheduled', label: 'Scheduled'},
                           {name: 'Pending', label: 'Pending'},
                            {name: 'Completed', label: 'Completed'}]
        },
        {name: 'dueDate', label: 'Due Date', sorted: true, datatype: 'date', formSubType: 'date'}
      ],
    },
    {
      name: 'Details',
      cols: 2,
      fields: [
        {
          name: 'account',
          label: 'Account',
          required: false,
          datatype: 'String',
          formType: 'lookup',
          reference: 'account',
          helpText: 'Account Associated with this work order'
        },
        {
          name: 'user',
          label: 'User',
          required: false,
          datatype: 'String',
          formType: 'lookup',
          reference: 'user',
          helpText: 'Technicians who fulfilled this work order'
        },

      ],
    }
  ]
};

export default workOrder;
