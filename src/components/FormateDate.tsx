

export function formatDate(dateString: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(dateString);
    let day: any = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    // Add leading zero if day is a single digit
    if (day < 10) {
        day = '0' + day;
    }

    let formattedDate = month + ' ' + day + ', ' + year;

    return formattedDate;
}

export function convertDateTime(dateTimeString: string): string {
    const formattedDate = new Date(dateTimeString).toISOString().replace('T', ' T ').split('.')[0];
    return formattedDate;
}