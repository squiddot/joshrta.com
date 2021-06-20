# Ichabod - Pennebaker Headless Scaffolding for CraftCMS
- If you are spinning up a new repo for a new project: [Click Here](#new-project-setup)

## Backup DB
TODO: New backup DB instructions

## Restore DB
TODO: New restore DB instructions

#Things That Need To Be Done

TODO- Create Default Scopes in PHPSTORM (this might be done?)

TODO: Possibly take out the plugins like seomatic? or maybe keep in?

From the github issues: Snitch, Navigation to Entry Structure Coupling, Retour, User Permissions, Redactor basic setups

TODO- Grab buddy file for repo
***

## New Project Setup
### Repo Setup
1. This is our scaffolding template repo. Instead of cloning it the regular way, you need to click the "Use this template" button on github to create a new repo.
1. Clone that repo.
1. `git branch develop`
1. `git checkout develop`
1. Replace all instances of `REPONAME` with the new repo name.
1. Edit the .env.example file with the information for the project. (Both frontend and backend files)
1. Make a copy of both .env.example files. Remove the .example part of the name. Do not add these to git.
1. cd to `backend`
1. `valet link api-REPONAME`
1. `composer install`
1. Create the db.
### Setup Craft Backend
1. navigate to api-REPONAME.test
1. Create the account - probably using some form of design+REPONAME@pennebaker.com, the same email, and a password from 1pass.
1. Save the info in 1pass.
1. Go into Plugin Store and Upgrade Craft CMS to Pro.
1. navigate to GraphQL in sidebar.
1. Create a new schema, call it Frontend
1. Create a new token, call it REPONAME
1. Click Regenerate to refresh the token, then copy and paste (and save).
1. Remove this section from the readme.
***

#`REPONAME`
In order to spin up this repo, you need to spin up both the back end and the front end.

# On First Clone

1. Clone the repo
1. Make sure to `git checkout develop`
## BACKEND Setup
1. cd to `backend`
1. `valet link api-REPONAME`
1. `composer install`

### If the database does not exist:

1. create the database `REPONAME_db_test`
1. copy the contents of `.env.example` to a new file, `.env`
1. Double check `DB_DSN="mysql:host=127.0.0.1;port=3306;dbname=REPONAME_db_test;"`
1. Visit your mailtrap.io demo inbox to find your username and password for the SMTP, use in next step.
1. update the following lines:\
   `SECURITY_KEY` - Doesn't matter for now. Type anything.\
   `BACKEND_SITE_URL` - `BACKEND_SITE_URL="http://api-REPONAME.test"`\
   `SMTP_USER` - Username from demo inbox.\
   `SMTP_PASS` - Password from demo inbox.\
   Also get S3 and Cloudfront info from someone.
1. restore existing database

## FRONTEND Setup

1. cd to `frontend`
1. copy the contents of `.env.example` to a new file, `.env`
1. update the following lines:
    ```
    GRAPHQL_URL=http://api-REPONAME.test
    BACKEND_URL=http://api-REPONAME.test
    ```
1. Login to `http://api-REPONAME.test/admin` with the login from onepass.
1. copy the contents of `.graphqlconfig.example` to a new file, `.graphqlconfig`
1. Get grapqhl token (You don't need "Authorization: Bearer", just the alphanumeric code)\
1. Add to:
   `.env` and
   `.graphqlconfig`
1. `yarn`

# On Pull
When you pull, if anything has changed (new packages added, etc) remember to run `composer install` and `yarn` to grab any new or updated packages. This will happen automatically if you are using PHPStorm and it is properly configured.
Yarn is for frontend, composer is for backend.


## Local Dev
While developing locally run:
1. `yarn dev`

## Building
You can build the files for dist with:
1. `yarn build`