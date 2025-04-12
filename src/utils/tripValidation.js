function parseDateTime12Hr(dateStr, timeStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    let [time, modifier] = timeStr.toUpperCase().split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return new Date(2000 + year, month - 1, day, hours, minutes);
}

module.exports = { parseDateTime12Hr };
