//Export one common metadata file, used for all objects
import user from './user';
import account from './account';
import announcement from './announcement';
import workOrder from './workOrder';
import product from './product';
import dashboard from './dashboard';

import displayTabs from './displayTabs';

//Create One Single Object to retrieve all metadata stored in this folder
const metadata = {
  displayTabs: displayTabs,
  user: user,
  account: account,
  announcement: announcement,
  workOrder: workOrder,
  product: product,
  dashboard: dashboard
}

export default metadata;

