import useCallbackRef from "hooks/useRefCallback";
import {
  updateMetaAction,
  updateSearchParamsAction,
} from "modules/MainContainer/NewsContainer/store/actions";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import classes from "./SearchBar.module.scss";
import { debounce } from "lodash";

const SearchBar = ({ updateSearchParams, updateMeta, searchParams }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();

  const [languageNode, languageRef] = useCallbackRef();
  const [countryNode, countryRef] = useCallbackRef();
  const [categoryNode, categoryRef] = useCallbackRef();

  useEffect(() => {
    M.FormSelect.init(languageNode);
    M.FormSelect.init(countryNode);
    M.FormSelect.init(categoryNode);
  }, [languageNode, countryNode, categoryNode]);

  console.dir(categoryNode);

  const clearAndFocusSearchInput = () => {
    setSearchQuery("");
    searchInputRef?.current?.focus();

    [languageNode, countryNode, categoryNode].forEach((option) => {
      option[0].selected = true;
    });
  };

  useEffect(() => {
    document.addEventListener("CLEAR_INPUT", clearAndFocusSearchInput);

    return () => {
      document.removeEventListener("CLEAR_INPUT", clearAndFocusSearchInput);
    };
  }, []);

  const triggerOnChange = useCallback(
    //  eslint-disable-next-line
    debounce((value) => {
      updateSearchParams({ query: value });
      updateMeta({ offset: 0, hasMore: true });
    }, 2000),
    [updateSearchParams, updateMeta]
  );

  const handleChangeSearchInput = useCallback(
    ({ currentTarget }) => {
      setSearchQuery(currentTarget.value);

      triggerOnChange(currentTarget.value);
    },
    [triggerOnChange]
  );

  const handleSubmit = useCallback(() => {
    updateSearchParams({ query: searchQuery });
    updateMeta({ offset: 0, hasMore: true });
  }, [updateMeta, updateSearchParams]);

  const handleChangeSelect = useCallback(
    (e) => {
      const type = e.target.dataset.cat;
      const value = e.target.value;

      const newParam = { [type]: value };
      updateSearchParams(newParam);

      if (searchParams.query.length !== 0) {
        updateMeta({ offset: 0, hasMore: true });
      }
    },
    [searchParams, updateSearchParams]
  );

  const handleKey = useCallback(
    async (e) => {
      if (e.keyCode === 13) {
        await handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className={classes.root}>
      <input
        type="text"
        value={searchQuery}
        ref={searchInputRef}
        onChange={handleChangeSearchInput}
        style={{ padding: "16px 24px 16px 50px", height: "auto" }}
        placeholder='?????????????? ??????????, ?????????????????? "???????????? ?? ??????????????????" '
        onKeyUp={handleKey}
      />
      <div className={classes.icon}>
        <i className="material-icons">search</i>
      </div>
      <div className={classes.submitBtn} onClick={handleSubmit}>
        ??????????
      </div>

      <div className="mt-2 jcsb">
        <div className={`${classes.filter} input-field"`}>
          <span>??????????????????</span>

          <select
            ref={categoryRef}
            onChange={handleChangeSelect}
            data-cat="category"
          >
            <option value="general">????????????????</option>
            <option value="business">????????????</option>
            <option value="entertainment">??????????????</option>
            <option value="health">????????????'??</option>
            <option value="science">??????????</option>
            <option value="sports">??????????</option>
            <option value="technology">????????????????????</option>
          </select>
        </div>
        <div className={`${classes.filter} input-field"`}>
          <span>????????</span>

          <select
            ref={languageRef}
            onChange={handleChangeSelect}
            data-cat="language"
          >
            <option value="">??????</option>
            <option value="ua">??????????????</option>
            <option value="de">????????????????</option>
            <option value="en">????????????????????</option>
            <option value="ru">??????????????????</option>
            <option value="it">????????????????????</option>
          </select>
        </div>
        <div className={`${classes.filter} input-field"`}>
          <span>????????????</span>

          <select
            ref={countryRef}
            onChange={handleChangeSelect}
            data-cat="country"
          >
            <option value="">??????</option>
            <option value="ua">??????????????</option>
            <option value="ru">??????????</option>
            <option value="us">??????</option>
            <option value="de">??????????????????</option>
            <option value="pl">????????????</option>
            <option value="cz">??????????</option>
            <option value="be">????????????????</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ mainNews: { searchParams } }) => ({
  searchParams,
});

export default connect(mapStateToProps, {
  updateSearchParams: updateSearchParamsAction,
  updateMeta: updateMetaAction,
})(SearchBar);
