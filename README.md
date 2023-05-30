# Learn It

A simple full-stack responsive website similar to a TODO/TASK_LIST APP, where you can take notes on the content you want to learn, including a title, description, and a link to the relevant materials.

## Demo

[LearnIt (Vercel and Render) ](https://learn-it-mern.vercel.app/)

- Due to the use of `PaaS`, the application may be slow. If the website lags, please wait for a moment for the system to boot up.

## Tech Stack

**Client:** React (create-react-app), Redux, TailwindCSS, Axios

**Server:** Node, Express, MongoDB

## Lessons Learned

Create simple MERN app

- Learn how to create a simple RESTful API server with authentication, authorization, and CRUD operations.
- Learn how to establish the connection between the client and server through an API.

## Features

- SignIn, SignUp
- Simple Responsive
- Create Posts (title, description, url)
- Edit Posts
- Delete Posts
- Search Posts (have APIs search by name / other fields, but frontend interface has not been implemented yet)

## Updating Features

- Change passwd
- Reset password via email
- Filter by status post: TO_LEARN, LEARNING, LEARNED
- Add timeline for posts and sort by startDate/timeDuration, ...
- Toastify for success, error in client
- Complete search posts
- ...

## Deployment

- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_USER`
`DB_PASSWORD`
`CLIENT_URL`
`JWT_SECRET_ACCESS_TOKEN`
`JWT_SECRET_REFRESH_TOKEN`
`LIMIT_POST`

## Run Locally

Clone the project

```bash
  git clone https://github.com/quyendv/learn-it-MernApp.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies and start the server

- Client

```bash
  cd client
  npm install
  npm start
```

- Server

```bash
  cd server
  npm install
  npm run dev
```

## API Reference

See more at `/server/api.rest`

## Preview

![image](https://github.com/quyendv/learn-it-MernApp/assets/80147846/abbec121-f9a3-4052-b3c9-2a61369340cd)
