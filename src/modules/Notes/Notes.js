import {
  deleteSavedNoteAction,
  saveNoteAction,
} from "modules/Notes/store/actions";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { _v } from "utils/short";
import { Formik, Field, Form } from "formik";
import classes from "./Notes.module.scss";

const Notes = ({ noteList, saveNote, deleteNote }) => {
  const [initialVal, setInitialVal] = useState({ subject: "", body: "" });
  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      saveNote(values);
      resetForm();
    },
    [saveNote]
  );
  return (
    <div className={classes.root}>
      <div className={classes.title}>Нотатки</div>
      <div className={classes.newNote}>
        <Formik initialValues={initialVal} onSubmit={handleSubmit}>
          {({ handleReset }) => (
            <Form>
              <div className={classes.fieldsContainer}>
                <Field
                  name="subject"
                  placeholder="Тема"
                  className={classes.field}
                  component="textarea"
                />
                <Field
                  name="body"
                  placeholder="Що бажаєте записати?"
                  className={classes.field}
                  rows={10}
                  component="textarea"
                />
                <div className="jcsb">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="waves-effect waves-light btn"
                  >
                    Очистити
                  </button>
                  <button
                    type="submit"
                    className="waves-effect waves-light btn"
                  >
                    Додати
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="container">
        <div className={classes.noteContainer}>
          {_v(noteList).map((note) => {
            return (
              <div className={classes.note}>
                <div className={classes.noteTitle}>{note.subject}</div>
                <div className={classes.noteBody}>{note.body}</div>
                <div className="jcsb mt-3 align-center">
                  <div className={classes.createdAt}>
                    <b> Створено: </b>
                    {new Date(note.createdAt).toLocaleDateString("pt-PT")}
                  </div>
                  <button
                    type="button"
                    className="waves-effect waves-light btn"
                    onClick={() => deleteNote(note.createdAt)}
                  >
                    <i className="material-icons right">delete</i>
                    Видалити
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ notes: { notes } }) => ({
  noteList: notes,
});
export default connect(mapStateToProps, {
  saveNote: saveNoteAction,
  deleteNote: deleteSavedNoteAction,
})(Notes);
