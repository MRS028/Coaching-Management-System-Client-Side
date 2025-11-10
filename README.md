# Coaching Management System — Client (CMS)

> A responsive client-side web application built with React and Vite for managing coaching center operations: courses, admissions, students, teachers, payments and dashboards.

## Key features

- Authentication (Firebase)
- Role-based dashboards (Admin / Teacher / Student)
- Course management (add, update, list)
- Admission workflow with PDF generation and payment placeholders
- Teacher and student profiles
- Reusable hooks for API calls, auth, and image uploads

## Tech stack

- React 19
- Vite
- Firebase (Auth + Firestore / Storage as needed)
- Axios for API calls
- Tailwind CSS + DaisyUI
- React Router
- TanStack Query (react-query)
- Misc: jspdf, html2canvas, react-hook-form, react-toastify

## Prerequisites

- Node.js 18+ and npm (or yarn)
- A Firebase project for Auth (and Firestore / Storage if you use them)

## Quick start (development)

1. Clone the repository and open the project folder

2. Install dependencies

```powershell
npm install
```

3. Add Firebase environment variables

This project reads Firebase configuration from Vite env variables (see `src/firebase.config.js`). Create a file named `.env.local` (or `.env`) in the project root and add the values from your Firebase Web app. Example:

```text
VITE_apiKey=your_api_key_here
VITE_authDomain=your-project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project_bucket.appspot.com
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

Note: After changing env variables you may need to restart the dev server.

4. Run the dev server

```powershell
npm run dev
```

Open http://localhost:5173 (or the address shown by Vite) in your browser.

## Build / Preview

- Build production assets

```powershell
npm run build
```

- Preview the built app (local static server)

```powershell
npm run preview
```

## Lint

```powershell
npm run lint
```

## Project structure (important files)

High-level layout (see `src/` for full details):

- `src/main.jsx` — app entry
- `src/App.jsx` — root routes / layout
- `src/firebase.config.js` — Firebase initialization (reads VITE\_ env vars)
- `src/Components` — UI components split by feature (Auth, Dashboard, Home, Hooks, Provider, Pages)
- `src/Provider/AuthProvider.jsx` — React context provider for auth
- `src/Route/Router.jsx` — application routes
- `src/Hooks` — custom hooks (useAuth, useAxiosPublic, useaxiosSecure, useRole, etc.)

The repository contains feature folders for Admin, Teacher, Student dashboards and shared pages like `NavBar`, `Footer`, and `Contact`.

## Environment & Firebase notes

- `src/firebase.config.js` uses Vite env variables prefixed with `VITE_`.
- Never commit your real keys to a public repo. Use `.env.local` and add it to `.gitignore`.

## Development checklist / tips

- Ensure your Firebase project's Authentication providers are configured (Email/Password, Google, etc.) to match the UI flow.
- If you add server endpoints, update the API base URL and secure routes used by `useaxiosSecure`.
- For PDFs the project uses `jspdf` and `html2canvas` — test PDF generation in the browser.

## Contributing

Contributions are welcome. Please open an issue or a PR and describe the change. Keep changes small and focused.

Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Run and test locally
4. Open a pull request against `main`

## Troubleshooting

- Dev server won't start: check Node version and run `npm install` again.
- Firebase auth issues: check the `VITE_` env values, and ensure you enabled the auth provider in Firebase console.

## License

This project is provided under the ISC license (see `package.json`).

## Contact

Repository: https://github.com/MRS028/Coaching-Management-System-Client-Side

Live demo: https://oddhayon-coaching-center.netlify.app

If you need help integrating a backend or configuring Firebase, open an issue with details about the problem and any error messages.

---

If you'd like, I can also:

- add a `.env.example` file containing the `VITE_` variables (safe to commit),
- add a short CONTRIBUTING.md, or
- generate small starter scripts for building Docker or deployment to Vercel/Netlify.

Let me know which of those you want next.
