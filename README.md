<div align="center">
  <img src="./public/logo-light.svg" alt="VICHARA Logo" width="200" height="auto">
</div>

# VICHARA

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Convex](https://img.shields.io/badge/Convex-1.25.4-FF6B6B?style=for-the-badge&logo=convex&logoColor=white)](https://convex.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-6.30.2-6C5CE7?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-3.24.2-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Jotai](https://img.shields.io/badge/Jotai-2.13.1-FF6B35?style=for-the-badge&logo=jotai&logoColor=white)](https://jotai.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A modern, intuitive note-taking application that helps you capture, organize, and manage your thoughts with ease.

## 🌟 Features

- **🔐 Secure Authentication** - Powered by Clerk for seamless user management
- **⚡ Real-time Sync** - Built with Convex for instant data synchronization
- **🎨 Modern UI** - Beautiful interface using Chakra UI v3 and Tailwind CSS v4
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **🌙 Dark Mode** - Eye-friendly theme switching with next-themes
- **📝 Rich Text Editing** - Powerful note editing capabilities
- **🔍 Smart Search** - Find your notes quickly and efficiently
- **🏷️ Organization** - Tag and categorize your thoughts with Jotai state management
- **🔔 Smart Notifications** - Real-time toast notifications with React Hot Toast
- **⚡ Smooth Animations** - Beautiful loading states with ldrs

## 🚀 Tech Stack

**Core Framework & Language**

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Runtime**: [React 19](https://reactjs.org/)

**Backend & Authentication**

- **Backend**: [Convex](https://convex.dev/) - Real-time backend-as-a-service
- **Authentication**: [Clerk](https://clerk.com/) - Complete user management

**UI & Styling**

- **UI Components**: [Chakra UI v3](https://chakra-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

**State Management & Forms**

- **Global State**: [Jotai](https://jotai.org/) - Primitive and flexible state management
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

**User Experience**

- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Loading Animations**: [ldrs](https://uiball.com/ldrs/)
- **Date Handling**: [date-fns](https://date-fns.org/)

**Development & Utilities**

- **Package Manager**: [pnpm](https://pnpm.io/)
- **Environment Management**: [T3 Env](https://env.t3.gg/)
- **Utility Classes**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Development Tools**: [concurrently](https://github.com/open-cli-tools/concurrently)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [pnpm](https://pnpm.io/) package manager
- A [Convex](https://convex.dev/) account
- A [Clerk](https://clerk.com/) account

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rootv890/vichara.git
   cd vichara
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Clerk Configuration
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex Configuration
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

4. **Set up Convex**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   pnpm run dev:all
   ```

   This will start both the Next.js development server and Convex in parallel.

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
vichara/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (AUTH)/         # Authentication routes
│   │   ├── (marketing)/    # Marketing pages
│   │   └── api/            # API routes
│   ├── components/         # Reusable UI components
│   ├── modules/            # Feature modules
│   └── providers/          # Context providers
├── convex/                 # Convex backend functions
├── public/                 # Static assets
└── ...config files
```

## 🚀 Deployment

NOT DEPLOYED YET

## 🧪 Scripts

- `pnpm dev` - Start Next.js development server
- `pnpm dev:all` - Start both Next.js and Convex development servers
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing React framework
- [Convex](https://convex.dev/) for the real-time backend platform
- [Clerk](https://clerk.com/) for authentication solutions
- [Chakra UI](https://chakra-ui.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Jotai](https://jotai.org/) for atomic state management
- [React Hook Form](https://react-hook-form.com/) for form handling
- [date-fns](https://date-fns.org/) for date utilities
- [React Icons](https://react-icons.github.io/react-icons/) for the icon library
- [ldrs](https://uiball.com/ldrs/) for loading animations

## 📞 Support

If you have any questions or need help, please:

- Open an [issue](https://github.com/rootv890/vichara/issues)
- Join our [Discord community](#)
- Email us at support@vichara.dev

---

<div align="center">
  <strong>Built with ❤️ by the VICHARA team</strong>
</div>

Audit manual color props throughout components
Test with clean Chakra color mode instead of next-themes
Remove global focus disable and let Chakra handle focus states
