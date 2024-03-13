# Users System API

This is an API to managers a users system, including a users CRUD, login system, encrypt password, JWT token, middleware of user permissions and middleware of token verification.

 ## About this project
 
 In this repository you will find a REST API, built with [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [MySql](https://www.mysql.com/), with the main objective of manager users and login with security and generata a permission system for this users.
  
## Getting Started

### Prerequisites

To run this API in the development mode, you'll need to have a environment with NodeJS installed and you'll need to have a MYSQL database running on your machine.

### Environment variables example
Create a .env file to save yours environment variables, like this:

```
PORT="3000",

JWT_EXPIRES_IN="180m",
JWT_SECRET="12345abcde!@#$%",

DB_NAME="my_db_name",
DB_USER="my_db_username",
DB_PASS="my_db_password",
DB_HOST="localhost",
DB_PORT="3333",
```

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/MateusZucco/Roster-Bot-Api.git
$ cd roster-bot-api
```

**Installing dependencies**

```
$ npm install
```
**Running the database's migrations**
Go to sql path and run all archives in your database workbench

### Running the Development environment

With all dependencies installed, the Database running and the environment properly configured, you can now run the server:

```
$ npm run dev
```

## Database

The database ER model can be finded [here](https://dbdiagram.io/d/users_diagram-654324357d8bbd646551dba3)

#### Users

> *user_id*: User's id.
> *email*: User's email.
> *password*: User's password.
> *first_name*: User's first name.
> *last_name*: User's last name.
> *age*: User's age.
> *status*: User's status [ativo/inativo].
> *profile_id*: User's profile id.

#### Profiles

> *profile_id*: Profile's id.
> *name*: Profile's name.
> *description*: Profile's description.
> *status*: Profile's status [ativo/inativo].

#### Permissions

> *permission_id*: Permission's id.
> *description*: Permission's desription.

### Relations
  A User has one Profile
  <br>
  A Profile has many Users
  <br>
  A Profile has many Permissions
  <br>
  A Permission has many Profiles

## Routes

You can view the routes documentation in [Postman API Page](https://web.postman.co/workspace/My-Workspace~6bbc3165-e64c-4067-8180-d79a3b0491f3/documentation/29131359-e3275fda-5562-46a6-b4a7-1fe6490c25fb).
