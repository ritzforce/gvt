const announcement = {
  theme: {
    label: 'Announcement',
    themeColor: '#D2E3EC',
    pluralLabel: 'Announcement',
    image: '/styles/images/announcement32.png',
    showNew: true,
    description: 'Broadcast important information to all users',
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
    {name: 'message', label: 'Message', sorted: true, datatype: 'String', formSubType: 'textarea'}
  ],
  detailView: [
    {
      name: 'Information',
      cols: 2,
      fields: [
        {
          name: 'name', label: 'Name', required: true, datatype: 'String', formType: 'input', helpText: 'Name of' +
        ' the Announcement'
        },
        {name: 'active', label: 'Active', datatype: 'Boolean', formType: 'checkbox', formSubType: 'checkbox'},
        {name: 'message', label: 'Message', required: true, datatype: 'string', formType: 'input', formSubType: 'textarea'},
      ],
    },
  ]
};

export default announcement;
