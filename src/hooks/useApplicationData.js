import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(state => ({ ...state, day }));

  //function that updates spots remaining after save action
  const updateSpotsOnSave = (appointment, id) => {
    if (
      state.appointments[id].interview === null &&
      appointment.interview !== null
    ) {
      const currentDay = state.days.find(day => day.name === state.day);
      currentDay.spots--;
    }
  };

  //function that updates spots remaining after delete action
  const updateSpotsOnDelete = (appointment, id) => {
    if (
      state.appointments[id].interview !== null &&
      appointment.interview === null
    ) {
      const currentDay = state.days.find(day => day.name === state.day);
      currentDay.spots++;
    }
  };

  //create a new appointment for interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    updateSpotsOnSave(appointment, id);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments
      });
    });
  }

  // delete an existing interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    updateSpotsOnDelete(appointment, id);

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments
      });
    });
  }

  useEffect(() => {
    const promiseDays = axios.get("/api/days");
    const promiseAppointments = axios.get("/api/appointments");
    const promiseInterviewers = axios.get("/api/interviewers");

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers]).then(
      resolvedData => {
        setState(state => ({
          ...state,
          days: resolvedData[0].data,
          appointments: resolvedData[1].data,
          interviewers: resolvedData[2].data
        }));
      }
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
