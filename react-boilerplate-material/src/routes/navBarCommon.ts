// material icon
import AddIcon from '@material-ui/icons/Add';
import ShopIcon from '@material-ui/icons/Shop';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AssessmentIcon from '@material-ui/icons/Assessment';

// configs
import { PATH_NAME, DRAWER_MENU_LABEL } from 'configs';

export const navBarCommon = [
  {  
    subheader: 'Menu',
    items : [
      {
        title: 'Subscriptions',
        href: PATH_NAME.SUBSCRIPTIONS,
        icon: SubscriptionsIcon,
        label: DRAWER_MENU_LABEL.SUBSCRIPTIONS,
      },
      {
        title: 'BankStatementUpload',
        href: PATH_NAME.BANK_STATEMENT_UPLOAD,
        icon: AccountBalanceIcon,
        label: DRAWER_MENU_LABEL.BANK_STATEMENT_UPLOAD,
      },
    ],
  },
];
