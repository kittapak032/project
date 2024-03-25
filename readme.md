** env_guide **

PORT=

JWT_KEY=

** api_service **

method path params body

POST /auth/register none {username, password, confirmPassword, email, address } POST /auth/login    none {username, password}
GET  /auth/me       none none

Notes

MVC (Models, route+Controller, View)