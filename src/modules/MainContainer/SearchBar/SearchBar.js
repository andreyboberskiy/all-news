import useCallbackRef from "hooks/useRefCallback";
import errorToastr from "libs/toastr/errorToastr";
import { toggleLoadingAction } from "modules/app/store/actions";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import { setMainNewsAction } from "modules/MainContainer/NewsContainer/store/actions";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import transformArrayToMap from "utils/transformArrayToMap";
import M from "materialize-css";
import classes from "./SearchBar.module.scss";
import { debounce, throttle } from "lodash";

const initialSearchParams = {
  query: "",
  category: "",
  language: "",
  country: "",
};

const initialMeta = {
  offset: 20,
  hasMore: true,
  limit: 10,
};

const emptyMeta = {
  offset: 0,
  hasMore: true,
  limit: 10,
};

const SearchBar = ({ setMainNews, setLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [meta, setMeta] = useState(initialMeta);

  const [languageNode, languageRef] = useCallbackRef();
  const [countryNode, countryRef] = useCallbackRef();
  const [categoryNode, categoryRef] = useCallbackRef();

  const triggerOnChange = useCallback(
    debounce((value) => {
      setSearchParams((prevState) => ({
        ...prevState,
        query: value,
      }));
      setMeta((prev) => ({ ...prev, offset: 0 }));
    }, 1000),
    []
  );

  const handleChangeSearchInput = useCallback(
    ({ currentTarget }) => {
      setSearchQuery(currentTarget.value);

      triggerOnChange(currentTarget.value);
    },
    [triggerOnChange]
  );

  useEffect(() => {
    M.FormSelect.init(languageNode);
    M.FormSelect.init(countryNode);
    M.FormSelect.init(categoryNode);
  }, [languageNode, countryNode, categoryNode]);

  const loadFirst = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { articles },
      } = await breakingNewsServices.getNewsBySearchParams(searchParams);

      if (!articles.length) {
        setMainNews({ query: searchQuery, searchResult: 0 });
      }
      if (articles.length) {
        setMainNews({
          library: transformArrayToMap(articles),
          query: searchQuery,
          searchResult: 1,
        });
      }
    } catch (e) {
      errorToastr("Error", e.message);
    }
    setLoading(false);
  }, [searchParams, searchQuery, setLoading, setMainNews]);

  const handleSubmit = useCallback(async () => {
    setMeta(emptyMeta);
  }, []);

  const handleChangeSearchParams = useCallback(
    async (e) => {
      let newParam = {};
      if (!searchParams.query.length) {
        newParam.query = "All";
      }

      const type = e.target.dataset.cat;
      const value = e.target.value;
      newParam = { ...newParam, [type]: value };
      setSearchParams((prevState) => ({ ...prevState, ...newParam }));
      setMeta(emptyMeta);
    },
    [searchParams]
  );

  const handleKey = useCallback(
    async (e) => {
      if (e.keyCode === 13) {
        await handleSubmit();
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    if (meta.offset !== 0 || searchParams.query.length === 0) {
      return;
    }
    (async () => {
      await loadFirst();
    })();
  }, [meta, searchParams, loadFirst]);

  return (
    <div className={classes.root}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChangeSearchInput}
        style={{ padding: "16px 24px 16px 50px", height: "auto" }}
        placeholder='Уведіть запит, наприклад "Новини в Запоріжжі" '
        onKeyUp={handleKey}
      />
      <div className={classes.icon}>
        <i className="material-icons">search</i>
      </div>
      <div className={classes.submitBtn} onClick={handleSubmit}>
        Пошук
      </div>

      <div className="mt-2 jcsb">
        <div className={`${classes.filter} input-field"`}>
          <span>Категорія</span>

          <select
            ref={categoryRef}
            onChange={handleChangeSearchParams}
            data-cat="category"
          >
            <option value="general">Загальне</option>
            <option value="business">Бізнес</option>
            <option value="entertainment">Розваги</option>
            <option value="health">Здоров'я</option>
            <option value="science">Наука</option>
            <option value="sports">Спорт</option>
            <option value="technology">Технології</option>
          </select>
        </div>
        <div className={`${classes.filter} input-field"`}>
          <span>Мова</span>

          <select
            ref={languageRef}
            onChange={handleChangeSearchParams}
            data-cat="language"
          >
            <option value="">Усі</option>
            <option value="ua">Україна</option>
            <option value="de">Німецька</option>
            <option value="en">Англійська</option>
            <option value="ru">Російська</option>
            <option value="it">Італійська</option>
          </select>
        </div>
        <div className={`${classes.filter} input-field"`}>
          <span>Країна</span>

          <select
            ref={countryRef}
            onChange={handleChangeSearchParams}
            data-cat="country"
          >
            <option value="">Усі</option>
            <option value="ua">Україна</option>
            <option value="ru">Росія</option>
            <option value="us">США</option>
            <option value="de">Німеччина</option>
            <option value="pl">Польща</option>
            <option value="cz">Чехія</option>
            <option value="be">Білорусь</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  setMainNews: setMainNewsAction,
  setLoading: toggleLoadingAction,
})(SearchBar);
