
const getExpiryDate = function () {
    return new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
};

module.exports = {
    getExpiryDate: getExpiryDate
}
