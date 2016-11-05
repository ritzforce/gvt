const DashboardMockData = {
  workOrderByTime: [
    ['Jan', 10, 10],
    ['Feb', 30, 30],
    ['Mar', 43, 43],
    ['Apr', 34, 34],
    ['May', 43, 43],
    ['Jun', 40, 40],
    ['Jul', 49, 49],
    ['Aug', 41, 41],
    ['Sep', 24, 24],
    ['Oct', 60, 60],
    ['Nov', 22, 22],
    ['Dec', 50, 50],
  ],
  workOrderByUser: [
    ['Shahrukh', 10, 10],
    ['Amitabh', 30, 30],
    ['Ganguly', 43, 43],
    ['Dhoni', 34, 34],
    ['Gauti', 43, 43],
    ['Ram', 40, 40],
    ['Shyam', 49, 49],
  ],
  top10Client: [
    ['ICICI Bank', 20, 20],
    ['State Bank of India',23,23],
    ['Axis Bank',39,39],
    ['Punjab National Bank',45,45],
    ['IDBI Bank',38,38],
    ['SBBJ',12,12],
    ['Dena Bank',27,27]
  ],
  pendingWorkOrder: [
    {id: 1, name: 'Workorder 1',active: true,status: 'Pending',dueDate:'1/7/2016'},
    {id: 2, name: 'Workorder 2', active: true,status:'Pending',dueDate:'10/8/2016'},
    {id: 3, name: 'Workorder 3', active: false,status:'Pending',dueDate:'11/9/2016'},
    {id: 4, name: 'Workorder 4', active: true,status:'Pending',dueDate:'10/10/2016'},
    {id: 5, name: 'Workorder 5', active: true,status:'Scheduled',dueDate:'20/10/2016'},
    {id: 6, name: 'Workorder 6', active: false,status:'Scheduled',dueDate:'1/11/2016'},
    {id: 7, name: 'Workorder 7', active: true,status:'Scheduled',dueDate:'29/12/2016'}
  ],

};

export default DashboardMockData;
