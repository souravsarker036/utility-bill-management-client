utility-bills 

Live site: https://utility-bills-a4d38.web.app/

Short description

A MERN-stack single page application for viewing and managing monthly utility bills (Electricity, Gas, Water, Internet). Users can register/login, pay current-month bills, view bill details, and download a PDF report of their paid bills. The UI is responsive and includes search, filter, and dynamic routing.

Key Features

Secure authentication with protected private routes (Bill Details, My Pay Bills).

Pay current-month bills only: the Pay button is enabled only for bills whose date falls in the current month; paying opens a modal form and stores payment data in MongoDB.

Bills browsing & filtering: view bills in a 3-column grid, filter by category and view limited recent bills on the homepage.

User-specific records: My Pay Bills shows only the logged-in user’s paid bills, with Update and Delete options and a downloadable PDF report (jsPDF + autoTable).

Responsive, accessible UI with dynamic titles, loading spinners, toasts/alerts for CRUD actions, and a consistent design system across pages.

Additional highlights:

Carousel banner with at least 3 slides on the Home page.

Extra home sections to increase UX value.

Dark/Light theme toggle.

Demo pages & routes

/ — Home 

/bills — All bills listing 

/bills/:id — Bill Details 

/my-bills — Logged-in user paid bills 

/login — Login 

/register — Register 

404 — Not found page

Tech Stack

Frontend: React, React Router, Axios, Tailwind / DaisyUI, react-hot-toast / SweetAlert for notifications

Backend: Node.js, Express.js, MongoDB (Atlas)

Auth: Firebase Authentication 

Hosting: Firebase Hosting (client) & Vercel 

Utilities: jsPDF + jsPDF-AutoTable (PDF export), jwt , axios interceptors 
