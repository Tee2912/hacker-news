import React, { useState, useEffect, ChangeEvent } from "react";
import NewsDataService from "../services/news.services";
import NewsCommentContent from "./NewsCommentContent";
import { useParams } from "react-router-dom";
import INews from "../types/News";

function NewsComment() {
  const [newsInfo, setNewsInfo] = useState<INews | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  // Get a specific query parameter
  const myParam = useParams();
  const id = myParam.commentId;

  useEffect(() => {
    NewsDataService.get(id).then((response) => {
      console.log(response.data);
      setNewsInfo(response.data);
      setLoading(false);
    });
  }, []);

  function timeConverter(UNIX_timestamp: number) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="ms-2 me-auto mb-4">
        <div className="fw-bold">
          {newsInfo?.title ?? "Title not available"}
        </div>
        <div>
          Source:{" "}
          <a href={newsInfo?.url ?? "#"}>
            {newsInfo?.url ?? "URL not available"}
          </a>
        </div>
        <span className="badge bg-primary rounded-pill">
          {newsInfo?.score ?? 0} points
        </span>
        <span> by {newsInfo?.by ?? "Unknown"} | </span>
        <span> {timeConverter(newsInfo?.time ?? 0)} | </span>
        <span> {newsInfo?.descendants ?? 0} comments </span>
      </div>
      {newsInfo?.kids.map((item: number, index) => (
        <>
          <ul className="list-group">
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={item}
            >
              <NewsCommentContent id={item}></NewsCommentContent>
            </li>
          </ul>
        </>
      ))}
    </>
  );
}

export default NewsComment;
