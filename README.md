# ofblog - React Blog Application

A modern, responsive blog application built with React, TypeScript, and Vite. Features authentication, internationalization, and a beautiful glassmorphism UI design.

## Features

- 🔐 **Authentication**: Secure login/logout with JWT token management
- 🌍 **Internationalization**: Multi-language support (English/Spanish)
- 🎨 **Modern UI**: Glassmorphism design with Tailwind CSS
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Fast**: Built with Vite for optimal performance
- 🛡️ **Type Safe**: Full TypeScript support

## Environment Setup

1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your API URL:
```env
VITE_API_URL=http://localhost:3001
```

## Authentication

The application includes a complete authentication system that works with your backend API:

### Login Endpoint
- **URL**: `POST /api/auth/login`
- **Body**: `{ email: string, password: string }`
- **Response**: `{ success: boolean, token: string, user: object, message?: string }`

### Features
- Automatic token storage in localStorage
- Protected routes with authentication checks
- Automatic logout functionality
- Error handling for failed login attempts
- Loading states and user feedback

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Backend Requirements

Your backend should implement the following login endpoint structure:

```javascript
router.post('/login', validateUserLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Your authentication logic here
  
  res.json({
    success: true,
    message: 'Login successful',
    token: 'your-jwt-token',
    user: userObject
  });
}));
```

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
