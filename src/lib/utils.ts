type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: Date, dateStyle: DateStyle = "medium", locales = "en") {
	let dateStr = date.toString();
	dateStr = dateStr.replaceAll("-", "/").split("/").reverse().join("/");
	const dateToFormat = new Date(dateStr);
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

/** Removes non-ascii characters from a string */
export function stringToAscii(str: string) : string {
	return str.replace(/[^\x00-\x7F]/g, "");
}

/** Removes non-lettery characters from a string */
export function stringToKebabCase(str: string) : string {
	return str.replace(/[^a-zA-Z-]/g, "");
}

/** Makes the first letter of a string upper-case */
export function capitalizeString(str: string) : string {
	if (str && str.length > 1) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	return str.toUpperCase();
}

/** Builds the HTML for a social account list. Might wanna turn it into a component */
export function buildSocialAccountHtml(obj: object, topKey?: string, htmlStuff = "") : string {
	const keys = Object.keys(obj) as (keyof typeof obj)[];
	const values = Object.values(obj);
	for (const [i, key] of keys.entries()) {
		let value = values[i];
		if (value == undefined) continue;
		if (typeof(value) == "object" && Object.keys(value).length > 0) {
			htmlStuff += "<li>\n";
			htmlStuff = buildSocialAccountHtml(value, key, htmlStuff);
			htmlStuff += "\n</li>\n"
		} else if (typeof(value) == "string") {
			const name: string = camelCaseToWordCase((topKey ? `${topKey} ` : "") + (topKey ? `(${key})` : key));
			htmlStuff += `\t
				<li><p>
					${name}: <a href=${value}>${value}</a>
				</p></li>` + '\n'
		}
	}
	return htmlStuff;
}

export function camelCaseToWordCase(yuh: string) : string {
	return yuh.replaceAll(/([A-Z])/g, " $1").toLowerCase()
}

export type ObjectUnpackType = Array<[Array<any>, any]>

/** Calls `callback` on every single value of the object recursively */
export function unpackObject(obj: object, result: ObjectUnpackType = [], topKey?: any) : ObjectUnpackType {
	const keys = Object.keys(obj) as (keyof typeof obj)[];
	const values = Object.values(obj);
	for (const [i, key] of keys.entries()) {
		let value = values[i];
		if (value == undefined) continue;
		if (typeof(value) == "object" && Object.keys(value).length > 0) {
			result = unpackObject(value, result, key);
		} else {
			let keyArray = [];
			if (topKey) keyArray.push(topKey);
			keyArray.push(key);
			result.push([keyArray, value]);
		}
	}
	return result;
}
