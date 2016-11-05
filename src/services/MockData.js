const MockData = {
  user: [
    {id: 1, username: 'Admin', active: true, name: 'Deepak Sharma',role:'admin',email: 'deepak@topcoder.com', mobile:'911231908678'},
    {id: 2, username: 'amitabh', active: true, name: 'Amitabh Bacchan',role:'user',email: 'amitabh@amitabh.com', mobile:'AM902890'},
    {id: 3, username: 'shahrukh', active: false, name: 'Shahrukh Khan',role:'admin',email: 'shahrukh@khan.com', mobile:'SHAH9086782'}
  ],
  account: [
    {id: 1, name: 'State Bank of India',active: true,address: 'Pratap Nagar, Jaipur , Sanganer'},
    {id: 2, name: 'ICICI Lombard', active: true, address:'Lal Quila, Udaipur' },
    {id: 3, name: 'Patiala Bank', active: true, address:'Qutub Minar, Delhi, Pin 100066' },
    {id: 4, name: 'Bank of Baroda', active: true, address:'Red Fort, Shahganj, Agra,' },
    {id: 5, name: 'Dena Bank', active: true, address:'7 Racecourse Road, Delhi NCR 100011' },
    {id: 6, name: 'Lena Bank', active: true, address:'KKR, Udaipur' },
    {id: 7, name: 'State Bank of India',active: true,address: 'Pratap Nagar, Jaipur , Sanganer'},
    {id: 8, name: 'Bank of America', active: false, address:'10 Janpath' },
    {id: 9, name: 'Yes Bank', active: true, address:'Meera Marg Pin 200066' },
    {id: 10, name: 'Citibank', active: true, address:'Bombay House, Near Taj Hotel' },
    {id: 11, name: 'Axis Bank', active: true, address:'Nariman Point Delhi NCR 100011' },
    {id: 12, name: 'HDFC', active: true, address:'Banker Street, Bombay' },
    {id: 13, name: 'Punjab and Sind Bank', active: true, address:'Allahabad, Uttar Pradesh' },
    {id: 14, name: 'Bank of Mysore', active: true, address:'Belapur' },
    {id: 15, name: 'HDFC Home Loan', active: true, address:'10 Downing Street, London' }
  ],
  announcement: [
    {id: 1, name: 'Holiday 1',active: true,message: 'There is a holiday tomorrow, because of Ganesh Chatruthi'},
    {id: 2, name: 'Refresh', active: true, message:'Please reinstall the application' }
  ],
  workOrder: [
    {id: 1, name: 'Workorder 1',active: true,status: 'Pending',dueDate:'1/1/2016', account: 'Lena Bank'},
    {id: 2, name: 'Workorder 2', active: true,status:'Complete',dueDate:'11/9/2016'},
    {id: 3, name: 'Workorder 3', active: false,status:'Complete',dueDate:'11/2/2016'}
  ],
  product: [
    {id: 1, name: 'Hammer',active: true},
    {id: 2, name: 'Turbine Fuel', active: true}
  ]

}


export default MockData;
