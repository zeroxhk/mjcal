import { createCopies } from '../models/Copies';

export default createCopies({
  appName: 'mj cal',
  locales: {
    chinglish: 'Chinglish',
    zhHk: '廣東話',
  },
  bottomMenu: {
    chart: 'Chart',
    table: 'Table',
    settings: 'Settings',
  },
  round: 'guk',
  score: 'score',
  addRound: 'Eat',
  next: 'Next',
  back: 'Back',
  cancel: 'Cancel',
  done: 'Done',
  winner: 'Eater',
  losers: 'Out-chungers',
  farn: 'farn',
  player: 'Player',
  selfTouch: 'self-touch',
  isSelfTouch: 'Is self-touch?',
  isBao: 'Is bao?',
  addPlayer: 'Add player',
  chungJai: 'Chung Jai',
  chungJais: {
    half: 'Half',
    full: 'Full',
  },
  chipValue: 'Scoring Method',
  chipValues: {
    c25chicken: '25 chicken',
    c51: '51',
    c12mosquitoes: '12 mosquitoes',
  },
  halfSpicyFrom: 'Half spicy from',
  halfSpicyFroms: {
    never: 'Never',
    customPlaceholder: 'custom',
  },
  noData: 'No data to show yet...',
  chartPlaceholderText: 'Add a guk to see chart...',
  openTable: 'Open table',
  landingPage: {
    heading: 'MJ Cal',
    subheading: 'Brainless geh cal',
  },
  openTablePage: {
    scoringSettings: {
      heading: 'Dim da fart?',
    },
    players: {
      heading: 'Players',
    },
    firstWuStep: {
      heading: 'All set!',
      subheading: 'Click the button below to add a wu',
    },
  },
  beforeUnloadMessage: 'Are you sure you want to leave? You may lose your game progress.',
  addRoundModal: {
    currentPlayersSelectTitle: 'Current players',
  },
  removeRoundMessage: 'Are you sure you want to remove the round? You cannot undo this change.',
});
