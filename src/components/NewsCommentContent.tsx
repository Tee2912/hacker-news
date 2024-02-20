import React, { useState, useEffect } from "react";
import NewsDataService from "../services/news.services";
import IComment from "../types/News";

interface Props {
  id: number;
}

function NewsCommentContent({ id }: Props) {
  const [newsComment, setNewsComment] = useState<IComment>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    NewsDataService.get(id).then((response) => {
      console.log(response.data);
      setNewsComment(response.data);
      setLoading(false);
    });
  }, []);

  function htmlDecode(str: string) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsComment?.text) {
    return null;
  }

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="ms-2 me-auto">
          <p className="mb-0">{htmlDecode(newsComment.text)}</p>
          <div className="mt-2">
            <span className="badge bg-primary rounded-pill me-2">
              {newsComment.by}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsCommentContent;
