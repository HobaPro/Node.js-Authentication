# Start-Authentication

PORT=5000

For Create Account { Method: POST, Path: "/api/createaccount", Data: {
  userName: string,
  email: string,
  password: string,
} }.
For LogIn { Method: POST, Path: "/api/login", Data: {
  email: string,
  password: string
} }.
For Steam LogIn { Method: GET, Path: "/api/steam-auth" }

#End-Authentication
