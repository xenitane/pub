const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default function formatDate(date: Date) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
