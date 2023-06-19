const isValidDate = (obj) => {
    return obj instanceof Date && !isNaN(obj);
}

module.exports = {isValidDate}
