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
