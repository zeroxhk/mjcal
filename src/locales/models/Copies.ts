export type Copies = Readonly<{
  appName: string;
  locales: {
    chinglish: 'Chinglish';
    zhHk: '廣東話';
  };
  bottomMenu: {
    chart: string;
    table: string;
    settings: string;
  };
  round: string;
  score: string;
  addRound: string;
  next: string;
  back: string;
  cancel: string;
  done: string;
  winner: string;
  losers: string;
  farn: string;
  player: string;
  players: string;
  selfTouch: string;
  isSelfTouch: string;
  isBao: string;
  addPlayer: string;
  chungJai: string;
  chungJais: {
    half: string;
    full: string;
  };
  chipValue: string;
  chipValues: {
    c25chicken: string;
    c51: string;
    c12mosquitoes: string;
  };
  halfSpicyFrom: string;
  halfSpicyFroms: {
    never: string;
    customPlaceholder: string;
  };
  noData: string;
  chartPlaceholderText: string;
  openTable: string;
  landingPage: {
    heading: string;
    subheading: string;
  };
  openTablePage: {
    scoringSettings: {
      heading: string;
    };
    players: {
      heading: string;
    };
    firstWuStep: {
      heading: string;
      subheading: string;
    };
  };
}>;

export const createCopies = (c: Copies) => c;
