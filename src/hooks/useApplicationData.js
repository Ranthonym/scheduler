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

  const getRemainingSpots = appointment => {
    const currentDay = state.days.find(day => day.name === state.day);

    if (appointment.interview === null) {
      currentDay.spots++;
    } else if (appointment.interview !== null) {
      currentDay.spots--;
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

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      getRemainingSpots(appointment);
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

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      getRemainingSpots(appointment);
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
