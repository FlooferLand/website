type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: Date, dateStyle: DateStyle = "medium", locales = "en") {
	let dateStr = date.toString();
	dateStr = dateStr.replaceAll("-", "/").split("/").reverse().join("/");
	const dateToFormat = new Date(dateStr);
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}
