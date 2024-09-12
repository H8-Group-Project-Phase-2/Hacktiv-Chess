Hacktiv-Chess Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `PATCH /winner`
- `PATCH /losser`
- `PATCH /draw`
- `GET /user/:userId`
- `POST /rooms`
- `GET /rooms`
- `GET /rooms/:roomId`
- `PATCH /rooms/:roomId`

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

## 6. GET /user/:userId
Description:
Retrieve user information by user ID.

Request:

- Params:
userid: The ID of the user to retrieve information.

_Responses(200 - OK)_


```json

{
  "id": "integer",
  "username": "string",
  "status": "string"
}

```
_Response (400 - Bad Request)_

```json

{
  "message": "Invalid user ID"
}

```

&nbsp;

## 7. POST /rooms
Description:
Create a new game room.

Request:

- Body:

```json

{
  "roomName": "string"
}

```
_Responses(201 - Created)_


```json

{
  "roomId": "integer",
  "roomName": "string"
}

```
_Responses (400 - Bad Request)_

```json

{
  "message": "Room name is required"
}

```

&nbsp;

## 8. GET /rooms
Description:
Get all available rooms.

_Responses (200 - OK)_


```json

[
  {
    "roomId": "integer",
    "roomName": "string"
  }
]

```
&nbsp;

## 9. GET /rooms/
Description:
Retrieve details of a specific room by its ID.

Request:

Params:
roomId: The ID of the room to retrieve.

_Responses(200 - OK)_


```json

{
  "roomId": "integer",
  "roomName": "string",
  "players": [
    {
      "playerId": "integer",
      "username": "string"
    }
  ]
}

```

_Responses(404 - Not Found)_

```json

{
  "message": "Room not found"
}

```
&nbsp;

## 10. PATCH /rooms/
Description:
Join a room by its ID.

Request:

Params:
roomid: The ID of the room to join.

_Responses(200 - OK)_


```json

{
  "message": "Successfully joined the room"
}
```

Responses (404 - Not Found)_
```json

{
  "message": "Room not found"
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

&nbsp;
