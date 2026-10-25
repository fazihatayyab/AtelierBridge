AtelierBridge

A scouting platform for fashion designers and brands. Designers post their looks and tag the brand that inspired them. Brands get a dashboard of every design tagged to them, with a link to the designer's profile and contact number. AI reads each photo and fills in the colour, fabric, silhouette and work type, so nobody fills in a tagging form.

Live demo: coming soon

Features :

Designers

Upload a photo with a one-line caption
AI generates colour, fabric, silhouette and work type for each post
Tag a brand by searching for it by name
Browse a feed of other designers' work
Public profile with bio, avatar, contact number and their own posts; delete their own posts

Brands

Scout dashboard listing every design tagged to the brand, with the designer's bio
Profile with an aesthetic description and contact details

Both

Register as a designer or a brand
Secure login with short-lived access tokens and refresh tokens
Role-based access on the server and in the UI
Tech stack
Layer	Technology
Frontend	React, Vite, React Router, Tailwind CSS, Axios
Backend	Node.js, Express 5
Database	PostgreSQL with Prisma ORM
Auth	JWT access and refresh tokens, bcrypt, httpOnly cookies
Image storage	ImageKit (uploads handled in memory with Multer)
AI	Google Gemini vision model, called through its OpenAI-compatible endpoint
Validation	express-validator
Local database	Docker Compose
Design decisions
Brand tags are real relations, not text. A post stores the tagged brand's user ID as a foreign key. If a brand changes its name or logo, every tagged post updates automatically, and the scout dashboard is a simple query on that key.
One User table with a role. Designers and brands share registration, login and profile logic. A DESIGNER or BRAND role decides which routes and pages a user can reach.
Refresh-token rotation with revocable sessions. The access token lives for 15 minutes and is kept in memory, never in localStorage. The refresh token lives in an httpOnly cookie for 7 days. Only a SHA-256 hash of it is stored, in a Session table, and it is replaced on every refresh. Each login is its own session, so one device can be logged out without affecting the others.
Automatic recovery from expired tokens. The frontend wraps requests in a helper that, on a 401, refreshes the token once and retries the same request.
Stateless backend. Uploaded images go straight to ImageKit instead of the server's disk. The database stores the image URL and ImageKit's file ID, so deleting a post also deletes the file.
AI never blocks an upload. If the vision call fails, the post is still saved, just without tags.
Access is enforced twice. Express middleware checks the role on every protected route, and the UI hides pages the user can't use.


Project structure :

AtelierBridge/
├── backend/
│   ├── prisma/            schema.prisma and migrations
│   ├── src/
│   │   ├── config/        Prisma client
│   │   ├── Controllers/   auth, designer, brand, profile, AI tagging
│   │   ├── middlewares/   role checks and request validation
│   │   ├── routes/
│   │   ├── services/      ImageKit storage
│   │   └── app.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── Pages/
│       ├── Components/
│       └── Context/       auth and feed state
└── docker-compose.yml     local PostgreSQL

Prerequisites :

Node.js 20 or newer
Docker Desktop (for the local database)
An ImageKit account
A Google AI Studio API key