export default function  formatDate (dateString)  {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}
