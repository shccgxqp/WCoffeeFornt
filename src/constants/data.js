const navItems = [
  { href: 'home', title: 'Home' },
  { href: 'about', title: 'Coffee Origins' },
  { href: 'menu', title: 'Menu' },
  { href: 'store', title: 'Store' },
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
const coffee = [
  {
    title: 'Aperol Sprtiz',
    price: '$20',
    tags: 'Aperol | Villa Marchesi prosecco | soda | 30 ml',
  },
  {
    title: "Dark 'N' Stormy",
    price: '$16',
    tags: 'Dark rum | Ginger beer | Slice of lime',
  },
  {
    title: 'Daiquiri',
    price: '$10',
    tags: 'Rum | Citrus juice | Sugar',
  },
  {
    title: 'Old Fashioned',
    price: '$31',
    tags: 'Bourbon | Brown sugar | Angostura Bitters',
  },
  {
    title: 'Negroni',
    price: '$26',
    tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
  },
];

export default { navItems, coffee, vipData, vipDataImg };
