# About
**IP Address Management Solution Frontend**

# Table of Contents

| No. | Title                         |
|-----|-------------------------------|
| 1   | [Todos](#task-implemented)    |
| 2   | [Installation](#installation) |

# Todos
1. Authentication system, which will generate an authenticated token, with all subsequent steps requiring this authenticated token.
2. Add/Modify IP address with a small label/comment to it.
    1. Only authenticated user can do this.
    2. IP address must be validated before creating new entry
    3. IP address can't be modified, only the label of it.
    4. No delete action needed

# Installation

## Normal Installation
1. **Pre-requirements:** Use node version >= v16.14.0
2. Clone this repo.
3. **Install npm packages**: run `npm install`
4. If you need to change API base url, change it in `src\config\config.js`
5. Run project: `npm run start`

## Docker Installation
If you want to use docker to run this project
1. Install docker in your OS system
2. Clone this repo.
3. Copy `docker-compose.yml.example` and paste as `docker-compose.yml` in root directory.
4. In `package.json`, change
```angular2html
"start: "react-scripts start"
```
to
```angular2html
"start": "./node_modules/.bin/react-scripts start", 
```
5. If you need to change API base url, change it in `src\config\config.js` 
6. Build and up the docker containers: run `docker compose up -d`
