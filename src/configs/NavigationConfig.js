import { 

  UserAddOutlined,
  TeamOutlined,
  SwapOutlined,
  SettingOutlined,
  UserSwitchOutlined, 
  WalletOutlined 
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import { ROLE_COMERCIAL, ROLE_MASTER, ROLE_SHOP } from 'redux/constants/Auth';

const dashBoardNavTree = [{
  key: 'Users ',
  path: `${APP_PREFIX_PATH}/users/add-user`,
  title: 'Users',
  icon: UserAddOutlined,
  breadcrumb: false,
  premission: ROLE_COMERCIAL,
  submenu: [{
    key: 'add-user',
    path: `${APP_PREFIX_PATH}/users/add-user`,
    title: 'Add User',
    icon: UserAddOutlined,
    breadcrumb: false,
    premission: ROLE_COMERCIAL,
    submenu: []
  },
  {
    key: 'users',
    path: `${APP_PREFIX_PATH}/users`,
    title: 'Users List',
    icon: TeamOutlined,
    breadcrumb: false,
    submenu: []
  }]
},
{
  key: 'Financement',
  path: `${APP_PREFIX_PATH}/transactions/list`,
  title: 'Financement',
  icon: SwapOutlined,
  breadcrumb: false,
  premission:ROLE_SHOP,
  submenu: [{
    key: 'transactions',
    path: `${APP_PREFIX_PATH}/transactions/list`,
    title: 'Transactions',
    icon: SwapOutlined,
    breadcrumb: false,
    submenu: []
  },
 {
    key: 'movements',
    path: `${APP_PREFIX_PATH}/movements/list`,
    title: 'Movements',
    icon: WalletOutlined,
    premission:ROLE_COMERCIAL,
    breadcrumb: false,
    submenu: []
  }]
},
{
  key: 'player transactions',
  path: `${APP_PREFIX_PATH}/transactions/player`,
  title: 'player',
  premission:ROLE_SHOP,
  exactAuth: true,
  icon: UserSwitchOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'player transactions',
      path: `${APP_PREFIX_PATH}/transactions/player`,
      title: 'Tickets',

      icon: UserSwitchOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
},

{
  key: 'settings',
  path: `${APP_PREFIX_PATH}/settings`,
  title: 'Settings',
  icon: SettingOutlined,
  breadcrumb: false,
  premission :ROLE_MASTER,
  submenu: []
}
,
{
  key: 'utilite',
  path: `${APP_PREFIX_PATH}/utilite`,
  title: 'SHOP',
  icon: /* TrophyOutlined */SettingOutlined ,
  breadcrumb: false,
  premission :ROLE_SHOP,
  exactAuth: true,
  submenu: [
    {
      key: 'utilite',
      path: `${APP_PREFIX_PATH}/utilite`,
      title: 'Utilite',
      icon: /* TrophyOutlined */SettingOutlined ,
      breadcrumb: false,
      premission :ROLE_SHOP,
      submenu: []
    }
  ]
},


]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
