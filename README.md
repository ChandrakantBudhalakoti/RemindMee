# RemindMee

A simple reminder web application built with React and Vite, designed to help users manage tasks efficiently.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [License](#license)

## Features
- Create, edit, and delete reminders
- Responsive design for desktop and mobile
- Fast development and build process with Vite
- Serverless functions support via Netlify

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Other**: PostCSS, Prettier

## Project Structure
```
├── .cursor/                # Cursor configuration
├── client/                 # Client-side React code
├── netlify/
│   └── functions/          # Netlify serverless functions
├── public/                 # Static assets
├── server/                 # Server-side logic
├── shared/                 # Shared utilities or components
├── .dockerignore           # Docker ignore rules
├── .gitignore              # Git ignore rules
├── .npmrc                  # NPM configuration
├── .prettierrc             # Prettier configuration
├── LICENSE                 # Project license
├── README.md               # Project documentation
├── components.json         # Component configuration
├── index.html              # Main HTML entry
├── netlify.toml            # Netlify configuration
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lock file
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── vite.config.server.ts   # Vite server configuration
└── yarn.lock               # Yarn lock file
```

## Getting Started

### Prerequisites
- Node.js (^22.5.5)
- Yarn or NPM
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ChandrakantBudhalakoti/RemindMee.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RemindMee
   ```
3. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

### Running the App
1. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```
2. Open your browser and visit `http://localhost:your-port-number`.

### Deployment
To deploy on Netlify:
1. Push your code to a GitHub repository.
2. Connect the repository to Netlify via the Netlify dashboard.
3. Configure the build settings in `netlify.toml` (already included).
4. Deploy the app using Netlify CLI or automatic Git integration.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Live Preview

`https://remindmedates.netlify.app/`
