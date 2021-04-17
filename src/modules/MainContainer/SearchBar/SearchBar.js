import useCallbackRef from "hooks/useRefCallback";
import errorToastr from "libs/toastr/errorToastr";
import { toggleLoadingAction } from "modules/app/store/actions";
import breakingNewsServices from "modules/BreakingNews/breakingNewsServices";
import { setMainNewsAction } from "modules/MainContainer/NewsContainer/store/actions";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import transformArrayToMap from "utils/transformArrayToMap";
import M from "materialize-css";
import classes from "./SearchBar.module.scss";

const initialSearchParams = {
  query: "",
  category: "",
  language: "",
  country: "",
};

const SearchBar = ({ setMainNews, setLoading }) => {
  const [seachValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  const [languageNode, languageRef] = useCallbackRef();
  const [countryNode, countryRef] = useCallbackRef();
  const [categoryNode, categoryRef] = useCallbackRef();

  const handleChange = useCallback(({ currentTarget }) => {
    setSearchValue(currentTarget.value);
    setSearchParams((prevState) => ({
      ...prevState,
      query: currentTarget.value,
    }));
  }, []);

  useEffect(() => {
    M.FormSelect.init(languageNode);
    M.FormSelect.init(countryNode);
    M.FormSelect.init(categoryNode);
  }, [languageNode, countryNode, categoryNode]);

  const handleSubmit = useCallback(() => {
    (async () => {
      try {
        setLoading(true);
        const {
          data: { articles },
        } = await breakingNewsServices.getNews(searchParams);

        if (!articles.length) {
          setMainNews({ query: seachValue, searchResult: 0 });
        }
        if (articles.length) {
          setMainNews({
            library: transformArrayToMap(articles),
            query: seachValue,
            searchResult: 1,
          });
        }
        setLoading(false);
      } catch (e) {
        errorToastr("Error", e.message);
      }
    })();
  }, [seachValue, searchParams, setMainNews]);

  const handleChangeSearchParams = useCallback(
    (e) => {
      const type = e.target.dataset.cat;
      const value = e.target.value;
      const newParam = { [type]: value };
      setSearchParams((prevState) => ({ ...prevState, ...newParam }));
      handleSubmit();
    },
    [handleSubmit]
  );

  const handleKey = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleSubmit();
      }
    },
    [handleSubmit]
  );
  return (
    <div className={classes.root}>
      <input
        type="text"
        value={seachValue}
        onChange={handleChange}
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
          <select
            ref={categoryRef}
            onChange={handleChangeSearchParams}
            data-cat="category"
          >
            <option value="" disabled selected>
              Категорія
            </option>
            <option value="general">Загальне</option>
            <option value="business">Бізнес</option>
            <option value="entertainment">Розваги</option>
            <option value="health">Здоров'я</option>
            <option value="science">Наука</option>
            <option value="sports">Спорт</option>
            <option value="technology">Технології</option>
          </select>
          <label>Категорія</label>
        </div>
        <div className={`${classes.filter} input-field"`}>
          <select
            ref={languageRef}
            onChange={handleChangeSearchParams}
            data-cat="language"
          >
            <option value="" disabled selected>
              Мова
            </option>
            <option value="">Усі</option>
            <option value="de">Німецька</option>
            <option value="en">Англійська</option>
            <option value="ru">Російська</option>
            <option value="it">Італійська</option>
          </select>
          <label>Мова</label>
        </div>
        <div className={`${classes.filter} input-field"`}>
          <select
            ref={countryRef}
            onChange={handleChangeSearchParams}
            data-cat="country"
          >
            <option value="" disabled selected>
              Країна
            </option>
            <option value="">Усі</option>
            <option value="ua">Україна</option>
            <option value="ru">Росія</option>
            <option value="us">США</option>
            <option value="de">Німеччина</option>
            <option value="pl">Польща</option>
            <option value="cz">Чехія</option>
            <option value="be">Білорусь</option>
          </select>
          <label>Країна</label>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  setMainNews: setMainNewsAction,
  setLoading: toggleLoadingAction,
})(SearchBar);
