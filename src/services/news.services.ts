import http from "../http-common";

const getAll = () => {
  return http.get<Array<number>>("/v0/topstories.json");
};

const get = (id: any) => {
  return http.get<any>(`/v0/item/${id}.json?print=pretty`);
};

const NewsDataService = {
  getAll,
  get,
};

export default NewsDataService;
