# theater_tickets

## Implemented NodeJs REST APIs using express framework and postgresql DB

### Run the docker-compose file in the root directory (docker-compose up): It will create two containers (node_backend and db)
```
docker-compose up
```
### The application running on port: 9000
### Swagger Docs Endpoint: http://localhost:9000/api-docs
### We can access all endpoints using swagger docs and before accessing any endpoint we need JWT token.
### In swagger, there is an API like ***A(GET:  /api/token)***A - This will give you the token and validity is 60min
### We need to set this token in the swagger Authorize section before accessing any endpoints other than the token endpoint

> Note:By default there no data in DB.Please create some records using POST API ***A( POST: api/tickets)***A
