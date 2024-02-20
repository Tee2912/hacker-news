export default interface INews {
  url: string;
  title: string;
  score: number;
  by: string;
  id: number;
  time: number;
  descendants: number;
}

export default interface IComment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
