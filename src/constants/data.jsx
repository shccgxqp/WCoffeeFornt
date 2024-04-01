import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiTool } from 'react-icons/fi';
import { BsKanban, BsBarChart } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine, RiAppsLine } from 'react-icons/ri';
import { GiLouvrePyramid, GiWashingMachine, GiSwapBag, GiManualMeatGrinder } from 'react-icons/gi';
import { BiSolidCoffeeBean } from 'react-icons/bi';
import { IoShirtOutline } from 'react-icons/io5';

export const navItems = [
  { href: 'home', title: '首頁' },
  { href: 'about', title: '咖啡小知識' },
  { href: 'store', title: '線上商店' },
];

export const userItems = [
  {
    id: '1',
    name: '個人資料',
    href: '',
    icon: <IoMdContacts />,
  },
  { id: '2', name: '訂單', href: 'order/?page=1', icon: <RiContactsLine /> },
];
export const adminItems = [
  {
    id: '1',
    name: '使用者資料',
    href: '',
    icon: <IoMdContacts />,
  },
  { id: '2', name: '訂單資料', href: 'order/?page=1', icon: <RiContactsLine /> },
  { id: '3', name: '商品資料', href: 'product/?page=1', icon: <RiAppsLine /> },
];
export const shopItems = [
  {
    id: '3',
    name: '咖啡豆',
    icon: <BiSolidCoffeeBean />,
  },
  {
    id: '2',
    name: '濾掛咖啡',
    icon: <GiSwapBag />,
  },
  {
    id: '4',
    name: '工具',
    icon: <FiTool />,
  },
  {
    id: '5',
    name: '衣服',
    icon: <IoShirtOutline />,
  },
  {
    id: '6',
    name: '咖啡機',
    icon: <GiWashingMachine />,
  },
  {
    id: '7',
    name: '磨豆機',
    icon: <GiManualMeatGrinder />,
  },
  {
    id: '1',
    name: '其他',
    icon: <RiAppsLine />,
  },
];

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'ecommerce',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'orders',
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: 'employees',
        icon: <IoMdContacts />,
      },
      {
        name: 'customers',
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: 'Apps',
    links: [
      {
        name: 'calendar',
        icon: <AiOutlineCalendar />,
      },
      {
        name: 'kanban',
        icon: <BsKanban />,
      },
      {
        name: 'editor',
        icon: <FiEdit />,
      },
      {
        name: 'color-picker',
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: 'Charts',
    links: [
      {
        name: 'line',
        icon: <AiOutlineStock />,
      },
      {
        name: 'area',
        icon: <AiOutlineAreaChart />,
      },

      {
        name: 'bar',
        icon: <AiOutlineBarChart />,
      },
      {
        name: 'pie',
        icon: <FiPieChart />,
      },
      {
        name: 'financial',
        icon: <RiStockLine />,
      },
      {
        name: 'color-mapping',
        icon: <BsBarChart />,
      },
      {
        name: 'pyramid',
        icon: <GiLouvrePyramid />,
      },
      {
        name: 'stacked',
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];

export const vipData = (strNumber) => {
  switch (strNumber) {
    case '1':
      return '小蝦級別';
    case '2':
      return '蝦王級別';
    case '3':
      return '大蝦級別';
    case '4':
      return '虎斑蝦';
    case '5':
      return '尊爵蝦王';
    default:
      return 'VIP 0';
  }
};

export const vipDataImg = (strNumber) => {
  switch (strNumber) {
    case '1':
      return 'text-orange-300';
    case '2':
      return 'text-amber-500';
    case '3':
      return 'text-orange-950';
    case '4':
      return 'text-cyan-300';
    case '5':
      return 'text-indigo-600';
    default:
      return '';
  }
};

export default { navItems, vipData, vipDataImg, links, userItems, adminItems, shopItems };
