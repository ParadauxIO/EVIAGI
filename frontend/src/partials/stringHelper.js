const getPlacementSuffix = number => {
    let suffix = "th";
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        suffix = "st";
    } else if (lastDigit === 2 && lastTwoDigits !== 12) {
        suffix = "nd";
    } else if (lastDigit === 3 && lastTwoDigits !== 13) {
        suffix = "rd";
    }

    return suffix;
}

export { getPlacementSuffix }