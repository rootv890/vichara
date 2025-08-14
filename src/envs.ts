import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		BETTER_AUTH_SECRET: z.string().min(1),
		CONVEX_SITE_URL: z.url(),
		CONVEX_DEPLOYMENT: z.string(),
		CLERK_SECRET_KEY: z.string().min(1),
		CLERK_JWT_ISSUER_DOMAIN: z.string().min(1),
	},

	client: {
		// for frontend
		NEXT_PUBLIC_CONVEX_URL: z.url(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
		NEXT_PUBLIC_CLERK_FRONTEND_API_URL: z.string().min(1),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: {
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
		CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
		NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		NEXT_PUBLIC_CLERK_FRONTEND_API_URL:
			process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
		CLERK_JWT_ISSUER_DOMAIN: process.env.CLERK_JWT_ISSUER_DOMAIN,
	},

	emptyStringAsUndefined: true,
})
