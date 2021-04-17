import successToastr from "libs/toastr/successToastr";
import React, { useCallback } from "react";
import classes from "./NewsItem.module.scss";
const NewsItem = ({
  source: { name: author },
  urlToImage,
  title,
  publishedAt,
  url,
  description,
  onSave,
  onDelete,
  saveDate,
}) => {
  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      onSave({
        source: { name: author },
        urlToImage,
        title,
        publishedAt,
        url,
        description,
      });
      successToastr("Новина збережена");
    },
    [onSave]
  );
  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      onDelete(publishedAt);
      successToastr("Новина видалена");
    },
    [onDelete]
  );
  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <img src={urlToImage} alt={title} />
      </div>
      <div className={classes.body}>
        <div>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{description}</div>
        </div>
        <ul>
          <li>
            Автор: <span>{author}</span>
          </li>
          <li>
            Дата публікації:{" "}
            <span>{new Date(publishedAt).toLocaleDateString("pt-PT")}</span>
          </li>
          {saveDate && (
            <li>
              Дата збереження:{" "}
              <span>{new Date(saveDate).toLocaleString()}</span>
            </li>
          )}
        </ul>
        <div className={classes.controls}>
          <div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="waves-effect waves-light btn"
            >
              <i className="material-icons right">link</i>Перейти до орігіналу
            </a>
          </div>
          <div>
            {onSave && (
              <a
                href="#"
                className="waves-effect waves-light btn"
                onClick={handleSave}
              >
                <i className="material-icons right">save</i>Зберегти
              </a>
            )}
            {onDelete && (
              <a
                href="#"
                className="waves-effect waves-light btn"
                onClick={handleDelete}
              >
                <i className="material-icons right">delete</i>Видалити
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
