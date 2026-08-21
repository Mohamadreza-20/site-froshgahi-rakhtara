import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z.string().url("VITE_API_URL باید یک URL معتبر باشد").default("http://localhost:3000"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
	const message = parsed.error.issues.map((issue) => issue.message).join("\n");
	throw new Error(`پیکربندی محیطی پروژه معتبر نیست:\n${message}`);
}

export const env = parsed.data;
