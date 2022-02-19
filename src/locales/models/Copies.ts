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
}>;

export const createCopies = (c: Copies) => c;
