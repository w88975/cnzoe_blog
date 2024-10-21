const UTC = 8;

/**
 * Formats a given date into a relative time string or a specific date format
 * @param {Date|string|number} date - The date to format
 * @returns {string} Formatted date string
 */
function formatRelativeTime(date) {
    const now = new Date();
    const inputDate = new Date(date);

    // Adjust for UTC+8
    const adjustedNow = new Date(now.getTime());
    const adjustedInputDate = new Date(inputDate.getTime() + UTC * 60 * 60 * 1000);

    const diffInSeconds = Math.floor((adjustedNow - adjustedInputDate) / 1000);
    const diffInHours = Math.floor(diffInSeconds / 3600);

    if (diffInHours < 24) {
        if (diffInHours === 0) {
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            return diffInMinutes === 0 ? '刚刚' : `${diffInMinutes}分钟前`;
        }
        return `${diffInHours}小时前`;
    }

    const year = adjustedInputDate.getFullYear();
    const month = String(adjustedInputDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedInputDate.getDate()).padStart(2, '0');
    const hours = String(adjustedInputDate.getHours()).padStart(2, '0');
    const minutes = String(adjustedInputDate.getMinutes()).padStart(2, '0');
    const seconds = String(adjustedInputDate.getSeconds()).padStart(2, '0');

    if (adjustedNow.getFullYear() === year) {
        return `${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return `${year}-${month}-${day}`;
}

export { formatRelativeTime }
