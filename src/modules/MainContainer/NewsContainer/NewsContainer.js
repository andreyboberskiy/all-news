import NewsItem from "modules/MainContainer/NewsContainer/NewsItem/NewsItem";
import { saveNewsAction } from "modules/Saved/store/actions";
import React, { useMemo } from "react";
import { connect } from "react-redux";
import { _v } from "utils/short";
import classes from "./NewsContainer.module.scss";

const NewsContainer = ({
  newsList,
  query,
  startedNews,
  searchResult,
  saveNews,
}) => {
  const firstTime = useMemo(() => {
    if (Object.values(startedNews).length) {
      return true;
    }
    return false;
  }, [startedNews]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {firstTime ? (
          <>
            Пізнавайте більше разом з <span>All News</span>
          </>
        ) : (
          <>
            {" "}
            Новини за запитом: <span>{query}</span>
          </>
        )}
      </div>
      <div className="container">
        <div className={classes.newsItems}>
          {firstTime ? (
            Object.values(startedNews).map((news) => (
              <div key={news.puplishedAt}>
                <NewsItem {...news} onSave={saveNews} />
              </div>
            ))
          ) : (
            <>
              {searchResult === 1 ? (
                Object.values(newsList).map((news) => {
                  return news.urlToImage ? (
                    <div key={news.puplishedAt ?? news.title}>
                      <NewsItem {...news} onSave={saveNews} />
                    </div>
                  ) : null;
                })
              ) : (
                <div className="">Нічого не знайдено. Спробуйте ще раз</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  mainNews: { library, query, startedNews, searchResult },
}) => ({
  newsList: library,
  query,
  startedNews,
  searchResult,
});
export default connect(mapStateToProps, { saveNews: saveNewsAction })(
  NewsContainer
);
