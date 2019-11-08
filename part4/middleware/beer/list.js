function listBeers(req, res, next) {
    res.locals.beers = [
        {
            id: "tesztId1",
            when: "2019.11.08.",
            where: "Budapest",
            what: "Soproni IPA",
            liter: "0.5"
        },
        {
            id: "tesztId2",
            when: "2019.11.06.",
            where: "Paks",
            what: "Soproni APA",
            liter: "0.5"
        },
        {
            id: "tesztId3",
            when: "2019.10.25.",
            where: "Kisterenye",
            what: "Borsodi",
            liter: "0.5"
        },
        {
            id: "tesztId4",
            when: "2019.10.24.",
            where: "Budapest",
            what: "Borsodi Mester",
            liter: "0.5"
        },
        {
            id: "tesztId5",
            when: "2019.10.20.",
            where: "Budapest",
            what: "Soproni IPA",
            liter: "0.33"
        }
    ];
    next();
}

module.exports = listBeers;
