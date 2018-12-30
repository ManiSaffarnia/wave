module.exports = (filtersObject) => {
    const filters = {}
    for (let key in filtersObject) {
        if (filtersObject[key].length > 0) {
            if (key === "price") {
                filters[key] = {
                    $gte: filtersObject[key][0],
                    $lte: filtersObject[key][1]
                }
            } else {
                filters[key] = filtersObject[key];
            }
        }
    }

    return filters
};

