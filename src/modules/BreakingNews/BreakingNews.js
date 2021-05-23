import BreakingNewsItem from "modules/BreakingNews/BreakingNewsItem/BreakingNewsItem";
import React, { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import "swiper/swiper.scss";
import classes from "./BreakingNews.module.scss";
import { connect } from "react-redux";
import { getBreakingNewsAction } from "modules/BreakingNews/store/actions";

const BreakingNews = ({ breakingNewsList, getBreakingNews }) => {
  const handleRefresh = useCallback(() => {
    getBreakingNews();
  }, [getBreakingNews]);
  return (
    <div className="teal darken-2">
      <div className="fz-3 ml-4 pt-3 pb-1 text-teal-light align-center d-flex">
        <b className="text-color-main">Головне </b>
        <span className="ml-1 mr-1"> на </span>
        {new Date().toLocaleDateString("pt-PT")}
        <i onClick={handleRefresh} className="material-icons ml-3 cup">
          refresh
        </i>
      </div>
      <div className="pl-4 pb-3">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          loop
          loopedSlides={3}
          noSwiping
          noSwipingClass="no-swipe"
        >
          {breakingNewsList.map(
            ({ publishedAt, title, description, urlToImage, url }) => {
              return urlToImage ? (
                <SwiperSlide key={publishedAt} className={clsx(classes.slide)}>
                  <BreakingNewsItem
                    title={title}
                    desc={description}
                    imgSrc={urlToImage}
                    url={url}
                  />
                </SwiperSlide>
              ) : null;
            }
          )}
        </Swiper>
      </div>
    </div>
  );
};

const mapStateToProps = ({ breakingNews: { library } }) => ({
  breakingNewsList: library,
});

export default connect(mapStateToProps, {
  getBreakingNews: getBreakingNewsAction,
})(BreakingNews);
