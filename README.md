# 📦 Mini-BaaS (Backend as a Service)

This is a simple backend service that allows:
- User authentication
- App creation and management
- Document/Query creation in a hierarchical database-like structure

---

## 📍 Base URL

```
http://localhost:3000
```

---

## 📁 `/user` – User Routes

### `POST /user/signup`

**Description**: Registers a new user.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "yourPassword",
  "name": "yourName"
}
```

**Response**:
```json
{
  "status": "done",
  "token": "JWT_TOKEN"
}
```

---

### `POST /user/signin`

**Description**: Authenticates a user.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "yourPassword"
}
```

**Response**:
```json
{
  "status": "done",
  "token": "JWT_TOKEN"
}
```

---

## 📁 `/app` – App Management Routes (Requires Auth)

### `POST /app/createApp`

**Description**: Creates a new app for a user.

**Request Body**:
```json
{
  "name": "MyApp",
  "id": "USER_ID"
}
```

**Response**:
```json
{
  "status": "done",
  "apiKey": "generated_api_key"
}
```

---

### `DELETE /app/deleteApp`

**Description**: Deletes an app by its API key and user ID.

**Request Body**:
```json
{
  "apikey": "API_KEY",
  "id": "USER_ID"
}
```

---

### `GET /app/getApps`

**Description**: Retrieves all apps owned by a user.

**Request Body**:
```json
{
  "id": "USER_ID"
}
```

---

## 📁 `/app/db` – Database Element Routes (Requires Auth)

### `POST /app/db/createQuery`

**Description**: Creates a query node, optionally under a parent element.

**Request Body**:
```json
{
  "name": "MyQuery",
  "parentId": "OPTIONAL_PARENT_ID",
  "apiKey": "API_KEY"
}
```

---

### `POST /app/db/createDocument`

**Description**: Creates a document node, optionally under a parent element.

**Request Body**:
```json
{
  "name": "MyDocument",
  "parentId": "OPTIONAL_PARENT_ID",
  "apiKey": "API_KEY"
}
```

---

### `POST /app/db/makeDocumentFull`

**Description**: Fills a document with fields (like a schema).

**Request Body**:
```json
{
  "parentId": "DOCUMENT_ID",
  "apiKey": "API_KEY",
  "data": {
    "fieldName1": [123, "Int"],
    "fieldName2": [true, "Bool"],
    "fieldName3": ["hello", "String"]
  }
}
```

---

### `DELETE /app/db/removeElement`

**Description**: Deletes a database element (and its children).

**Request Body**:
```json
{
  "id": "ELEMENT_ID",
  "apikey": "API_KEY"
}
```

---

### `GET /app/db/readElement`

**Description**: Recursively reads elements under a parent (can be null for root).

**Request Body**:
```json
{
  "apiKey": "API_KEY",
  "id": "OPTIONAL_PARENT_ID"
}
```

**Response Example**:
```json
{
  "children": [
    {
      "type": "Document",
      "name": "UserProfile",
      "children": [...]
    },
    {
      "type": "Int",
      "value": 42
    }
  ]
}
```

---

## 🛡 Middleware

All `/app` and `/app/db` routes are protected with `userMiddlewere` that verifies the JWT token from `Authorization` header.

---

## ✅ Status Codes

- `200`: Success
- `400`: Client-side error (missing params, invalid types, etc.)
- `500`: Server error