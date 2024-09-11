Hacktiv-Chess Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `PATCH /winner`
- `PATCH /losser`
- `PATCH /draw`

&nbsp;

1. POST /register

Description:
Register a new user

Request:

- body:

```json

{
  "username": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json

{
  "id": "integer",
  "username": "string",
  "password": "string",
  "access_token": "string"
}

```

_Response (400 - Bad Request)_

```json
{
  "message": "username or password is required"
}
```

&nbsp;

## 2. POST /login

Description:
User Login

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Username or Password is required"
}
OR
{
  "message": "Invalid Username/password"
}
```

&nbsp;

## 3.PATCH /winner

Description:
Update user status as a winner.

Request:


_Response (200 - OK)_

```json
{
  "message": "Winner status updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid request data"
}
```

&nbsp;


## 4.PATCH /losser

Description:
Update user status as a losser.

Request:


_Response (200 - OK)_

```json
{
  "message": "Losser status updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid request data"
}
```

&nbsp;


## 5.PATCH /draw

Description:
Update user status to draw.

Request:


_Response (200 - OK)_

```json
{
  "message": "Draw status updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid request data"
}
```

&nbsp;

## Global Errors

_Response(401 - Unauthorized)_

```json

{
  "message": "Unauthorized"
}

```

_Response(500 - Internal Server Error)_

```json

{
  "message": "Internal Server Error"
}

```

## 3.PATCH /winner

Description:
Update user status as a winner.

Request:


_Response (200 - OK)_

```json
{
  "message": "Winner status updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid request data"
}
```

&nbsp;
