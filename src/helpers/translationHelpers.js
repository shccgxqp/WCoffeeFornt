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
