export let companyPhone = "+967783263332"
export const chunkArray = (array, size) => {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
export function toLocalDateTime(inputDate) {
  if (!inputDate) return "";

  const d = new Date(inputDate);
  if (isNaN(d)) return "";

  // Adjust to keep local date/time
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);

  // Return ISO format without milliseconds or timezone
  return local.toISOString().slice(0, 19);
}