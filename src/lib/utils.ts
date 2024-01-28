type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: string, dateStyle: DateStyle = "medium", locales = "en") {
	date = date.replaceAll("-", "/").split("/").reverse().join("/");
	const dateToFormat = new Date(date);
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}
