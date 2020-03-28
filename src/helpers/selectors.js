//function that fetches all appointments assigned for the selected day
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(stateDay => day === stateDay.name);
  if (!foundDay) {
    return [];
  }

  const foundAppointments = foundDay.appointments.map(appointment => {
    return state.appointments[appointment];
  });

  return foundAppointments;
}

//function that returns interview object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

//function that fetches all interviewers assigned for the selected day
export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find(stateDay => day === stateDay.name);
  if (!foundDay || foundDay.interviewers.length === 0) {
    return [];
  }

  const foundInterviewers = foundDay.interviewers.map(interviewer => {
    return state.interviewers[interviewer];
  });
  return foundInterviewers;
}

export default { getAppointmentsForDay, getInterview, getInterviewersForDay };
