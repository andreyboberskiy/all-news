import NewsItem from "modules/MainContainer/NewsContainer/NewsItem/NewsItem";
import { saveNewsAction } from "modules/Saved/store/actions";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { _v } from "utils/short";
import classes from "./NewsContainer.module.scss";
import {
  setMainNewsAction,
  loadFirstNewsAction,
  updateSearchParamsAction,
} from "modules/MainContainer/NewsContainer/store/actions";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import errorToastr from "libs/toastr/errorToastr";

const defaultQuery = "Коронавирус";
const NewsContainer = ({
  newsList,
  searchParams,
  meta,
  saveNews,
  setMainNews,
  loadFirstNews,
  updateSearchParams,
}) => {
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [needSecondary, setNeedSecondary] = useState(false);

  const handleDispatchClearInput = useCallback(() => {
    const event = new Event("CLEAR_INPUT", { bubbles: true });
    console.log(event);
    document.dispatchEvent(event);
  }, []);

  const handleSetNewsByDefaultQuery = useCallback(async () => {
    try {
      handleDispatchClearInput();
      const {
        data: { articles },
      } = await breakingNewsServices.getAllNewsByQuery({
        query: defaultQuery,
      });
      updateSearchParams({
        query: defaultQuery,
        category: "",
        language: "",
        country: "",
      });
      setMainNews(articles);
    } catch (e) {
      errorToastr("Ошибка", e.message);
    }
  }, [setMainNews, handleDispatchClearInput]);

  useEffect(() => {
    if (needSecondary) {
      (async () => {
        try {
          const {
            data: { articles },
          } = await breakingNewsServices.getAllNewsByQuery({
            query: searchParams.query,
          });
          setSecondaryNews(articles);
          setNeedSecondary(false);
        } catch (e) {
          errorToastr("Ошибка", e.message);
        }
      })();
    }
  }, [needSecondary, searchParams.query]);

  useEffect(() => {
    if (newsList.length === 0) {
      setNeedSecondary(true);
    } else {
      setNeedSecondary(false);
      setSecondaryNews([]);
    }
  }, [newsList.length]);

  const shouldLoad = useMemo(
    () =>
      meta.offset === 0 &&
      meta.hasMore &&
      !meta.loading &&
      searchParams.query.length !== 0,
    [meta, searchParams.query]
  );

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    (async () => {
      await loadFirstNews();
    })();
  }, [shouldLoad, loadFirstNews]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {searchParams.query ? (
          <div>
            Новини за запитом: <span>{searchParams.query}</span>
          </div>
        ) : null}
      </div>
      <div className="container">
        {newsList.length > 0 ? (
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
              onClick={handleSetNewsByDefaultQuery}
            >
              Спробуйте ще раз
            </div>
            {searchParams.query.length && secondaryNews.length > 0 ? (
              <>
                <div>
                  Усi новини за запитом: <span>{searchParams.query}</span>
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
      </div>
    </div>
  );
};

const mapStateToProps = ({ mainNews: { list, meta, searchParams } }) => ({
  newsList: list,
  meta,
  searchParams,
});
export default connect(mapStateToProps, {
  saveNews: saveNewsAction,
  setMainNews: setMainNewsAction,
  updateSearchParams: updateSearchParamsAction,
  loadFirstNews: loadFirstNewsAction,
})(NewsContainer);
