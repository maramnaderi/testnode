var Ordinateur = require('./ordinateurModel');

async function list(req, res, next) {
    await Ordinateur.find()
        .then((data, err) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(data);
        });
}

const create = async (req, res, next) => {
    const { model, category, dateFabrication, prix } = req.body;
    await new Ordinateur({
        model: model,
        category: category,
        dateFabrication: dateFabrication,
        prix: prix
    }).save()
        .then((data, err) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(data);
        });
}

const update = async (req, res, next) => {
    await Ordinateur.findByIdAndUpdate(req.params.id, req.body)
        .then((data, err) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(data);
        });
}

async function deleteU(req, res, next) {
    await Ordinateur.findByIdAndDelete(req.params.id)
        .then((data, err) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(data);
        });
}

async function searchByPrice(req, res, next) {
    const { minPrice, maxPrice } = req.query;
    await Ordinateur.find({ prix: { $gte: minPrice, $lte: maxPrice } })
        .then((data, err) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(data);
        });
}

// ordinateur/ordinateurService.js
function ordinateurView(req, res, next) {
    res.render('ordinateur');
}

module.exports = { list, create, update, deleteU, searchByPrice, ordinateurView };