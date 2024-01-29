import { browser } from "$app/environment";
import { writable } from "svelte/store";

type Theme = "light" | "dark";

const userTheme = browser && localStorage.getItem("color-scheme");
export const theme = writable(userTheme ?? "dark");

/** Returns the new theme */
export function toggleTheme() {
	let newTheme;
	theme.update((current) => {
		newTheme = current === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("color-scheme", newTheme);
		localStorage.setItem("color-scheme", newTheme);
		return newTheme;
	});

	return newTheme;
}

export function setTheme(newTheme: Theme) {
	theme.set(newTheme);
}
