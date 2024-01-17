const GameModel = require("../models/Game.model")

const router = require("express")()

router.get("/", async (req, res) => {
    try {
        const games = await GameModel.find()

        return res.status(200).json(games)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

} )

router.post('/', (req, res, next) => {
    GameModel.create(req.body)
        .then((createdGame) => {
            console.log(err)
            res.json(createdGame)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
})

module.exports = router