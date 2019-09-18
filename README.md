# pie
## Overview
Marion Berry... or choose your own flavor! Because we do not really know what solution we are building yet. We are currently in the Discovery & Framing phase of a project to help our Post-Ingest Exploitation cell.

##Setup
### Dependencies
* `mysql stable 5.7.20+`
* `java 1.8`
* `maven 4.0.0`
* `node 10.16.0`
    *`yarn 1.17.3`

##Environment Variables
These variables are required:
- `PIE_DB_URL`
- `PIE_DB_USERNAME`

You can setup all required environment variables by running
 
 `source ./scripts/setup_env.sh`
 
 ### Setup the database
 * `./scripts/setup_db.sh`

## Build
### Client
* Be sure dependencies are up to date with `cd client && yarn install`. 
* `cd client && yarn build`

### Backend
* `./mvnw install`

## Develop
### Seed the Development Database
* `./scripts/seed_db.sh`

### Client Development Server
* `cd client && yarn start`

### Backend Development Server
* `./mvnw spring-boot:run`

## Test
#### Client Tests
* `cd client && yarn test`

#### Backend Tests
* `./mvnw test`

#### Acceptance Tests
* Ensure that the client has been built and that the app server is running locally.
* `cd acceptance && yarn install`
* `cd acceptance &&  npx codeceptjs run`

#### All tests
* `./scripts/tests.sh`

## Deploy
Traditionally, it will push at the end of its pipeline cycle (in Jenkins via NGA). You could also log into PCF via CLI:
* `cf login`
* `cf push`

## Resources
- Tracker: https://www.pivotaltracker.com/n/projects/2399049
- Continuous Integration and Deployment: https://jenkins.devops.geointservices.io/job/DGS-1%20Software%20Development%20Team/job/PIE/job/PIE_Multibranch/job/acceptance/
- Acceptance: https://pie.dev.dev.east.paas.geointservices.io/
