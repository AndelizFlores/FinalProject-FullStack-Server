const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,  //added
    },
    photo: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
    friends: [{type: Schema.Types.ObjectId, ref: "User"}],
    gamesLibrary: [{type: Schema.Types.ObjectId, ref: "Game"}],
    description: {
      type: String,
      minlength: 15,
      maxlength: 60, //added
      default: "My description..."
    },
    platforms: {
      type: [String],
      default: []  //form
    },
    location: {
      type: String,
    },
    occupation: {
      type: String,
    },
    viewedProfile: {
      type: Number,
    },
    impressions: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
