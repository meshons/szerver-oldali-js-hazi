function showBeer(req, res, next) {
    res.locals.beer = {
        id: "tesztId1",
        when: "2019.11.08.",
        where: "Budapest",
        what: "Soproni IPA",
        liter: "0.5"
    };
    next();
}

module.exports = showBeer;
