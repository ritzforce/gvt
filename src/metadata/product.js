const product = {
  theme: {
    label: 'Product',
    themeColor: '#EFE4F2',
    pluralLabel: 'Products',
    image: '/styles/images/product32.png',
    showNew: true,
    description: 'Products and Parts',
    listViewActions: [
      {action: 'Delete'},
      {action: 'Deactivate'},
      {action: 'Activate'}
    ],
    detailActions: [
    ]
  },
  listView: [
    {name: 'name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'active', label: 'Active', sorted: true, datatype: 'boolean', formSubType: 'checkbox'},
  ],
  detailView: [
    {
      name: 'Information',
      cols: 2,
      fields: [
        {
          name: 'name', label: 'Name', required: true, datatype: 'String', formType: 'input',
          helpText: 'Product Name'
        },
    ] ,
    },
    {
      name: 'Details',
      cols: 2,
      fields: [
        {name: 'active', label: 'Active', datatype: 'Boolean', formType: 'checkbox', formSubType: 'checkbox'}
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

export default product;
