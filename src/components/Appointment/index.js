import React, { useState, Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  }
  function onCancel() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(e => transition(ERROR_SAVE, true));
  }

  function confirm() {
    transition(CONFIRMING);
  }

  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => transition(ERROR_DELETE, true));
  }
  console.log(mode);
  return (
    <Fragment>
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"saving"} />}
      {mode === DELETING && <Status message={"deleting"} />}
      {mode === CONFIRMING && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={onCancel}
          onConfirm={cancel}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment"} onClose={onCancel} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={onCancel} />
      )}
    </Fragment>
  );
}
