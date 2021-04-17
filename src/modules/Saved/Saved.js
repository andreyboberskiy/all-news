import NewsItem from "modules/MainContainer/NewsContainer/NewsItem/NewsItem";
import { deleteSavedNewsAction } from "modules/Saved/store/actions";
import React from "react";
import { connect } from "react-redux";
import { _v } from "utils/short";
import classes from "./Saved.module.scss";

const Saved = ({ newsList, onDeleteNews }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>Збережені новини</div>
      <div className="container">
        <div className={classes.newsContainer}>
          {_v(newsList).map((news) =>
            news.urlToImage ? (
              <div key={news.puplishedAt ?? news.title}>
                <NewsItem {...news} onDelete={onDeleteNews} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ savedNews: { listMap } }) => ({
  newsList: listMap,
});
export default connect(mapStateToProps, {
  onDeleteNews: deleteSavedNewsAction,
})(Saved);
