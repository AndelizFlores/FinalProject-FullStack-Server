const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "None",
    },
    text: {
      type: String,
      default: "No story",
    },
    game: String,
    gameId: {type: Schema.Types.ObjectId, ref: "Game"},
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
