# Interview Scheduler

Interview Scheduler is a simple, responsive, full stack single-page scheduling web app built using React, HTML, CSS, JS on the front-end, and Node, Webpack, Axios and PostgreSQL on the back-end. React components were built using Storybook. API server was built on Express. Testing suite was built using React Testing Library, Jest and Cypress. The app allows a user to add new, edit and delete interview appointments.

This project implemented a stretch goal of deploying the API server on Heroku and the client on Netlify. CircleCI was used to setup a continous production pipleline.

The workflow was as follows: local:master --> Github:master --> CircleCI:production --> Github:production --> Netlify

## Screenshots

!["Screenshot of displaying existing interviews from api server"](https://github.com/Ranthonym/scheduler/blob/master/docs/Screenshot%20of%20displaying%20existing%20interviews%20from%20api%20server.png)
!["Screenshot of form for creating new interview"](https://github.com/Ranthonym/scheduler/blob/master/docs/Screenshot%20of%20form%20for%20creating%20new%20interview.png)
!["Screenshot of editing form for existing interview"](https://github.com/Ranthonym/scheduler/blob/master/docs/Screenshot%20of%20editing%20form%20for%20exiting%20interview.png)
!["Screenshot of confirmation message for deleting existing interview"](https://github.com/Ranthonym/scheduler/blob/master/docs/Screenshot%20of%20confirmation%20message%20for%20deleting%20existing%20interview.png)

## User Access

!["Live Client: lhl-scheduler.netlify.com "](https://lhl-scheduler.netlify.com/)

## API server

![Heroku deployment](https://schedule-lhl.herokuapp.com/api/days)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
