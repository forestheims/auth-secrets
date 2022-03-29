# AUTH SECRETS

### Objectives

- Use Express middleware to ensure requests are authenticated
- Use cookies to store user data
- Use JWTs for storing user data in cookies
- Sign & verify JWTs to ensure validitity
- Users can register using email & password
  - Stretch
    - users first and last name
    - authorized email domain only
- Users can log in using email & password
- Passwords are hashed when stored in the database
- User information is stored in a cookie when signed in
- Cookie contains a signed JWT of the user record
  - The `User` model instance should be an object with an `id` & `email`, but _**without the password hash!**_
- Logged in users can view top secrets by visiting `/api/v1/secrets`
- Logged in users can create new secrets by `POST`ing to `/api/v1/secrets`
- POST `{ email, password }` to `/api/v1/users/sessions` logs in a user
- DELETE `/api/v1/users/sessions` logs out a user
- POST `{ email, password }` to `/api/v1/users` creates a new user
- GET `/api/v1/secrets` returns a list of secrets (`[{ title, description, createdAt }]`)
- Each route is tested - Git history shows vertical approach - Password is stored in plaintext/password hash is stored in the JWT
