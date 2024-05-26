import { json } from "@sveltejs/kit";
import fs from "fs";
import path from "path";
import { getPosts } from "./posts";
import { regex } from "./config";

export type NestedArray<T> = T | Array<NestedArray<T> | T>

/** Returns a recursive array
	(https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search)
*/
export function walkDir(dirPath: string) : NestedArray<string> {
	const entries: fs.Dirent[] = fs.readdirSync(dirPath, { withFileTypes: true });
	return entries.map((entry: fs.Dirent) => {
		const childPath: string = path.join(dirPath, entry.name)
		return entry.isDirectory() ? walkDir(childPath) : childPath
	});
}

/** Returns all files from a directory */
export function recursiveReadDir(dirPath: string) : string[] {
	return (walkDir(dirPath) as string[]).flat(Number.POSITIVE_INFINITY);
}

export function getPathTagIdentifier() : string {
	return ".tag";
}
export function getPathTagName(name: string) : string {
	return `${getPathTagIdentifier}-${name.toLowerCase()}`;
}

type CommentHandler = (elem: string) => string;
type Route = { path: string, commentOut: boolean }
export function getAllRouteAddresses(hostUrl: URL, commentHandler: CommentHandler | undefined = undefined, skipPrivatePaths: boolean = true) {
	return getAllRoutes(skipPrivatePaths)
		.map(route => {
			const address = `${hostUrl.protocol}//${hostUrl.host}/${route.path}`;
			if (route.commentOut && commentHandler) {
				return commentHandler(address);
			} else {
				return address;
			}
		})
}

/**
	Returns all the route names and optionally the full path to those routes.
	Home gets returned as an empty string.
	- The way it currently works is kinda scuffed, but it works
*/
export function getAllRoutes(skipPrivatePaths: boolean = true, fullPath: boolean = false) : Route[] {
	const srcRoutes = path.join("src", "routes");
	const routesDir: string = path.join(process.cwd(), srcRoutes);
	const dirs = recursiveReadDir(routesDir);

	// Getting all the pages
	const handledTags: string[] = [];
	const routes: Route[] = [];
	for (let dirPath of dirs) {
		const routesDirPos = dirPath.indexOf(srcRoutes);
		dirPath = dirPath.substring((srcRoutes.length + 1) + routesDirPos);
		const parentDir = path.dirname(dirPath);
		let commentOut = false;
		
		// Handling tags
		const tagLocation = dirPath.indexOf(getPathTagIdentifier())
		if (tagLocation != -1) {
			const id = dirPath.substring(tagLocation + getPathTagIdentifier().length+1, dirPath.length);
			switch (id) {
				case "posts": {
					const posts = getPosts();
					posts.forEach(post => {
						const postDir = parentDir.replaceAll('\\', '/');
						routes.push({ path: `${postDir}/${post.slug}/`, commentOut });
					});
					break;
				}
				case "slugoptional": {
					break
				}
			}
			handledTags.push(parentDir);
		}

		// Page guard
		const isUsersidePage = path.basename(dirPath).match(regex.isUserfacingPage);
		if (!handledTags.includes(parentDir) && !isUsersidePage) {
			continue;
		}

		// Server / TS guard
		if (dirPath.includes(".server")) {
			continue;
		}

		// Removing that annoying dot
		let route: string = path.dirname(dirPath);
		if (route == '.') {
			route = "";
		}

		// Adding that annoying slash
		if (route.split('.').length == 1 && route.length > 1) {
			route += '/';
		}
		
		// Procedural argument guard
		if (route.includes('[') && route.includes(']')) {
			const checkedPath = path.dirname(route);
			if (handledTags.includes(checkedPath)) {
				continue;
			} else {
				console.warn(
					`UNHANDLED PROCEDURAL ROUTE "${checkedPath}" AT getAllRoutes\n`
					+ `\t- handledTags: [${handledTags}]`
				);
			}
			// Don't add procedural routes, since we don't know what value parameters can have
			commentOut = true;
		}

		// Skip secret stuff
		if (route.includes("private")) {
			if (skipPrivatePaths)
				continue;
			else
				commentOut = true;
		}
		
		// Pushing the route
		const prefix = (fullPath ? routesDir : "");
		const routePath = (prefix + route).replaceAll('\\', '/');
		if (routes.every(r => r.path != routePath)) {
			routes.push({ commentOut, path: routePath });
		}
	}

	return routes;
}

//** Entity-escapes a string */
export function entityEscape(url: string) : string {
	const escaped = url
		.replaceAll('&', "&amp;")
		.replaceAll('\'', "&apos;")
		.replaceAll('"', "&quot;")
		.replaceAll('>', "&gt;")
		.replaceAll('<', "&lt;")
	return encodeURI(escaped);
}

//** Trims lines in a code block */
export function codeblockTrim(code: string) : string {
	return code.replaceAll('\t', "")
				.split('\n').map(line => line.trim())
				.join('\n').trim();
}

/* Converts any object to JSON and creates a `Response` out of it */
export function apiResponse(content: object) : Response {
	return json(content);
}
