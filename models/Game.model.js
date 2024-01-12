const {Schema, model } = require('mongoose')

const gameSchema = new Schema({
    name: String

}, {
    strictQuery: false
})

module.exports = Game = model("game", gameSchema)

//Schema:

// slug: { type: String, required: true },
// name: { type: String, required: true },
// playtime: { type: Number, required: true },
// platforms: [{
//     platform: {
//         id: { type: Number, required: true },
//         name: { type: String, required: true },
//         slug: { type: String, required: true }
//     }
// }],
// stores: [{
//     store: {
//         id: { type: Number, required: true },
//         name: { type: String, required: true },
//         slug: { type: String, required: true }
//     }
// }],
// released: { type: Date, required: true },
// tba: { type: Boolean, required: true },
// background_image: { type: String, required: true },
// rating: { type: Number, required: true },
// rating_top: { type: Number, required: true },
// ratings: [{
//     id: { type: Number, required: true },
//     title: { type: String, required: true },
//     count: { type: Number, required: true },
//     percent: { type: Number, required: true }
// }],
// ratings_count: { type: Number, required: true },
// reviews_text_count: { type: Number, required: true },
// metacritic: { type: Number, required: true },
// id: { type: Number, required: true },
// score: { type: Number },
// clip: { type: String },
// esrb_rating: {
//     id: { type: Number, required: true },
//     name: { type: String, required: true },
//     slug: { type: String, required: true },
//     name_en: { type: String, required: true },
//     name_ru: { type: String, required: true }
// },
// user_game: { type: String },
// saturated_color: { type: String, required: true },
// dominant_color: { type: String, required: true },
// short_screenshots: [{
//     id: { type: Number, required: true },
//     image: { type: String, required: true }
// }],
// parent_platforms: [{
//     platform: {
//         id: { type: Number, required: true },
//         name: { type: String, required: true },
//         slug: { type: String, required: true }
//     }
// }],
// genres: [{
//     id: { type: Number, required: true },
//     name: { type: String, required: true },
//     slug: { type: String, required: true }
// }]