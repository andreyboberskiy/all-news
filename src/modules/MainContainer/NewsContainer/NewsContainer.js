import NewsItem from "modules/MainContainer/NewsContainer/NewsItem/NewsItem";
import { saveNewsAction } from "modules/Saved/store/actions";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { _v } from "utils/short";
import classes from "./NewsContainer.module.scss";
import { setMainNewsAction } from "modules/MainContainer/NewsContainer/store/actions";
import transformArrayToMap from "utils/transformArrayToMap";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import errorToastr from "libs/toastr/errorToastr";

const NewsContainer = ({
  newsList,
  query,
  startedNews,
  searchResult,
  saveNews,
  setMainNews,
}) => {
  const firstTime = useMemo(() => {
    if (Object.values(startedNews).length) {
      return true;
    }
    return false;
  }, [startedNews]);

  const [secondaryNews, setSecondaryNews] = useState([]);

  const handleStartNews = useCallback(
    async (defaultQuery) => {
      try {
        const {
          data: { articles },
        } = await breakingNewsServices.getAllNewsByQuery({
          query: defaultQuery,
        });
        setMainNews({
          library: transformArrayToMap(articles),
          searchResult: 1,
          query: "Україна",
        });
        if (articles.length === 0) {
          setSecondaryNews([]);
        }
      } catch (e) {
        errorToastr("Ошибка", e.message);
      }
    },
    [setMainNews, startedNews]
  );

  useEffect(() => {
    if (
      !firstTime &&
      searchResult === 0 &&
      query.length > 0 &&
      secondaryNews.length === 0
    ) {
      (async () => {
        try {
          const {
            data: { articles },
          } = await breakingNewsServices.getAllNewsByQuery({
            query,
          });
          setSecondaryNews(articles);
        } catch (e) {
          errorToastr("Ошибка", e.message);
        }
      })();
    }
  }, [firstTime, searchResult, query, secondaryNews]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {firstTime ? (
          <>
            Пізнавайте більше разом з <span>All News</span>
          </>
        ) : (
          <>
            {query ? (
              <div>
                Новини за запитом: <span>{query}</span>
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="container">
        {firstTime ? (
          <div className={classes.newsItems}>
            {_v(startedNews).map((news) => (
              <div key={news.puplishedAt || news.title}>
                <NewsItem {...news} onSave={saveNews} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {searchResult === 1 ? (
              <div className={classes.newsItems}>
                {_v(newsList).map((news) => {
                  return news.urlToImage ? (
                    <div key={news.puplishedAt || news.title}>
                      <NewsItem {...news} onSave={saveNews} />
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div
                className="tac font-weight-bold m0-auto"
                style={{ fontSize: 30 }}
              >
                <div> Нічого не знайдено за заданими параметрами</div>
                <div
                  className="text-color-main cup"
                  onClick={() => {
                    handleStartNews("Україна");
                  }}
                >
                  Спробуйте ще раз
                </div>
                {query && secondaryNews.length > 0 ? (
                  <>
                    <div>
                      Усi новини за запитом: <span>{query}</span>
                    </div>
                    <div className={classes.newsItems}>
                      {secondaryNews.map((news) => {
                        return news.urlToImage ? (
                          <div key={news.puplishedAt || news.title}>
                            <NewsItem {...news} onSave={saveNews} />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </>
        )}
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
export default connect(mapStateToProps, {
  saveNews: saveNewsAction,
  setMainNews: setMainNewsAction,
})(NewsContainer);
