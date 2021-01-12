const yesterday = () => {
    let date = new Date();
    return new Date(date.setDate(date.getDate() - 1));
}

module.exports = yesterday;