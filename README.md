# express-myimdb-api

1.  Initial steps to create api, which runs in node.

2.  `npm init -y` creates package.json

3.  download express frameword `npm i express`

4.  `echo node_modules >> .gitignore` creates .gitignore files and write node_modules

5.  create a application folder mkdir app with index.js file.

6.  Install the Dev dependencies `npm i -D nodemon`

    - `npm i morgan joi dotenv uuid` install the dependencies.
    - morgan prints the http log in the terminal
    - joi used to validate the user data given to the api.
    - dotenv used to maintain the secret files that should not pushed to the git repo, confidential datas.
    - uuid used to create unique id.
    - change the script in package.json to "start": "node app" and "dev": "nodemon"

7.  creating port in .env
    .env is created in the main folder and it must be included in the .gitignore file.
