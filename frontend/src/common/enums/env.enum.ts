const ENV = {
	API_PATH: import.meta.env.VITE_API_URL ?? "",
} as const;

export { ENV };
