## SPS React – User Management and Authentication

Simple frontend application built with **React** for user management and authentication (login/logout), created as a technical test.

The main focus is:
- **Usability** and clear navigation flow.
- **Clean interface**, responsive and consistent across pages.
- **Friendly error handling** for backend responses.

---

### Main features

- **User authentication**
    - Login screen with email and password.
    - Storage of token and authenticated user data.
    - Logout with session cleanup.
    - Protected routes that redirect to `/login` if the user is not authenticated.

- **User management**
    - User listing.
    - Create new user (admin profiles only).
    - Edit existing user (admin or the user themself).
    - Delete user (admin profiles only).
    - Display of basic data (name and email).

- **User roles**
    - `user` – basic access and can edit their own information.
    - `admin` – can create, edit and remove users.

- **Backend error handling**
    - All HTTP calls go through the `apiFetch` wrapper in `src/services/api.js`.
    - When the backend returns an error JSON in the format:
        - `{ "erro": "descriptive error message" }`
    - The app captures this text and shows it to the user in a **toast** / fixed notification at the top of the screen.

- **Navigation**
    - Uses `react-router-dom` v6.
    - Shared **NavBar** component across authenticated screens, with:
        - **Home** button always visible on the left.
        - Quick access to **Users**, **New user** (for admin) and **Logout**.

---

### Stack and main dependencies

- **React 18**
- **react-router-dom 6**
- **react-scripts 5**
- **Context API** for authentication (`AuthContext`)
- **Fetch API** with wrapper (`apiFetch`) for HTTP calls and standard error handling

All dependencies are described in `package.json`.

---

### Basic folder structure

- `src/`
    - `index.js` – React entry point, global providers and router.
    - `index.css` – global styles (layout, buttons, forms, navbar, notifications).
    - `routes.js` – route definitions (public and protected).
    - `context/`
        - `AuthContext.js` – authentication context (token, user, login, logout).
        - `NotificationContext.js` – context for showing notifications (error/success).
    - `components/`
        - `NavBar.js` – reusable navigation bar for authenticated pages.
        - `Notification.js` – visual toast/alert component.
    - `pages/`
        - `SignIn.js` – login screen.
        - `Home.js` – home page after login.
        - `Users.js` – user listing.
        - `UserEdit.js` – user creation/editing.
    - `services/`
        - `api.js` – `fetch` wrapper with token injection and error handling.
        - `AuthService.js` – authentication-related functions (e.g. login).
        - `UserService.js` – user CRUD functions.
        - `StorageService.js` – abstraction over `localStorage` (token/user).

---

### Expected backend

The frontend expects an HTTP backend exposed at the URL configured via env:

- **Required environment variable**:
    - `REACT_APP_API_URL=http://your-backend-here`

Expected endpoints (example):

- `POST /login`
    - Input: `{ email, password }`.
    - Output (success): `{ token: string, user: { name, email, type } }`.
    - Output (error): `{ erro: string }`.

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

On errors, the backend should preferably return:

{ "erro": "Message explaining the error" }

Routes that return only a status code (for example, 201 or 204 with no body) are also handled; the frontend does not try to JSON.parse when there is no content.

**Prerequisites**
 - Node.js LTS (recommended >= 18)
 - npm (or yarn, if you prefer to adapt the commands)

Check:
```
node -v
npm -v
```

### Environment setup

1. **Clone the project (if applicable):**
```
git clone <repository-url>
cd sps-react
```

2. **Install dependencies:**
```
npm install
```

3. **Configure environment variables:**

Create a .env file in the project root with:
```
REACT_APP_API_URL=http://localhost:3001
```

> Adjust the URL to match your backend host/port.

###Running in development

Use any of the commands below:
```
npm start
# or
npm run dev
```
By default, Create React App runs at http://localhost:3000.

### Production build

To generate optimized production files:
```
npm run build
```

The final files will be in the build/ folder, ready to be served by a static server (Nginx, Apache, etc.).

### Notes on authentication and route protection
* The token and authenticated user data are stored via StorageService.
* The AuthContext exposes:
    * user, token, isAuthenticated, login(), logout().
* Protected routes:
    * Non‑authenticated users are redirected to /login.
    * Some routes (like user creation/editing) are restricted to admin profiles.
  
### Backend error handling
* The apiFetch wrapper:
    * Automatically includes the Authorization: Bearer <token> header when a token is present.
    * On 401, clears authentication and redirects to /login.
    * On error, tries to read the response JSON:
        * Uses erro (when present) as the main message.
        * Falls back to message or a generic message in Portuguese.
* The error message is displayed to the user through NotificationContext and the Notification component, which shows a fixed toast at the top of the screen.


PORTUGUÊS
----------------------------------

# SPS REACT TEST

- Criar um CRUD de usuários

# Regras

- Criar a página de signIn para fazer a autenticação do usuário (Usar o usuário previamente cadastrado para validar)
- Pode usar qualquer tipo de storage para guardar o token
- Só será possível cadastrar e/ou visualizar os usuários se estiver autenticado
- Chamar a API que foi criada anteriormente (test-sps-server)
