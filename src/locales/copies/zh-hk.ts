import { createCopies } from '../models/Copies';

export default createCopies({
  appName: '麻雀計分器',
  locales: {
    chinglish: 'Chinglish',
    zhHk: '廣東話',
  },
  bottomMenu: {
    chart: '圖',
    table: '表',
    settings: '設定',
  },
  round: '局',
  score: '分數',
  addRound: '食糊',
  next: '繼續',
  back: '返回',
  cancel: '取消',
  done: '搞掂',
  winner: '食者',
  losers: '出銃者',
  farn: '番',
  player: '玩家',
  players: '玩家們',
  selfTouch: '自摸',
  isSelfTouch: '自摸？',
  isBao: '包？',
  addPlayer: '新增玩家',
  chungJai: '銃制',
  chungJais: {
    half: '半銃',
    full: '全銃',
  },
  chipValue: '籌碼計法',
  chipValues: {
    c25chicken: '二五雞',
    c51: '五一',
    c12mosquitoes: '一二蚊',
  },
  halfSpicyFrom: '幾番開始半辣？',
  halfSpicyFroms: {
    never: '從不',
    customPlaceholder: '自訂',
  },
  noData: '未有數據...',
  chartPlaceholderText: '食下糊先有圖睇...',
  openTable: '開檯',
  landingPage: {
    heading: '麻雀計分器',
    subheading: '唔洗用腦的器',
  },
  openTablePage: {
    scoringSettings: {
      heading: '點打法？',
    },
    players: {
      heading: '玩家',
    },
    firstWuStep: {
      heading: '搞掂哂！',
      subheading: '㩒下面個掣食糊！',
    },
  },
  beforeUnloadMessage: '真係要走？走咗就冇哂啲記錄嫁啦！',
});
