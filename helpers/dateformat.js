function dateFormat(value) {
    return value.toISOString().split("T")[0]
}

module.exports = dateFormat