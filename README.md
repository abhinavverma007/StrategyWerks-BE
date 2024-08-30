## Description
This repository contains backend server built with Loopback(A nodejs framework). It contains APIs
in `src/controller` to `GET` data. 
It has other APIs too.
Migration folder is added to prepopulate 10k rows in DB.

## Pre-requisites
1. You must have node in your system.
2. You must have nvm(node version manager) installed.
We are using node version 16.16.0.
After installing nvm, you can type `nvm install 18.20.4` to install this version
Then type `nvm use 18.20.4`
3. You must have MySQL as Database.(MySQL server and MySQL workbench).
4. If facing challenges with MySQL install on windows, follow this https://www.youtube.com/watch?v=uj4OYk5nKCg
For Ubuntu https://www.youtube.com/watch?v=9h3ctGFTz9w

## Steps to run the application

1. Run `npm install` in terminal
2. Make `.env` file at root level ( parallel to package.json).
3. Since your database is setup, make a database in MySQL and give it a name 
of your choice which 
4. Add 
`DB_HOST=your_host`
`DB_DATABASE=your_db`
`DB_USER=your_user`
`DB_PASSWORD=your_password` in `.env` file

4. Now run `npm run migrate` in terminal to populate your db with data
5. Now run `npm run start` in terminal
6. If you face ER_NOT_SUPPORTED_AUTH_MODE error then: follow this: https://stackoverflow.com/a/50131831 and then again `npm run start`
7. After successful compilation, your server is up at http://localhost:3000

## Steps to run the test case 
1. Run `npm run test` in terminal

## Steps to get code coverage
1. Run `npm run coverage` in terminal
![Passing test case with coverage](https://github.com/user-attachments/assets/ae991983-deca-4c9f-a2e3-016778738a53)

## Demo Video
[Demo Video](https://github.com/user-attachments/assets/47b3aad8-57af-47fa-be32-5f0a2672573a)