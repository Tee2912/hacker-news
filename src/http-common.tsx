import axios from "axios";

export default axios.create({
  baseURL: "https://hacker-news.firebaseio.com/",
  headers: {
    "Content-type": "application/json",
  },
});
