var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/User')

const Post = require('../models/Post')

const isAuthenticated = require('../middleware/isAuthenticated')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
  .populate('gamesLibrary friends')
  .then((foundUser) => {
    Post.find({userId: req.params.id})
    .then((foundPosts) => {
      res.json({user: foundUser, posts: foundPosts})
    })
    .catch((err) => {
      console.log(err)
      res.json(MediaError)
    })
 
  })
  .catch((err) => {
    console.log(err)
    res.json(MediaError)
  })
 
});

router.put('/add-game/:gameId', isAuthenticated, (req, res, next) => {
    const gameToAdd = req.params.gameId;


    User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { gamesLibrary: req.params.gameId}
      },
      {new: true}
    )
    .then((updatedUser) => {
      const { 
        email, 
        username, 
        photo, 
        _id,
        friends,   //added
        gamesLibrary, //added
        description, //added
        platforms,//added
        location, //added
        occupation, //added
      } = updatedUser;

      // Create an object that will be set as the token payload
      const payload = { 
        _id,
        email, 
        username, 
        photo,
        friends,   //added
        gamesLibrary, //added
        description, //added
        platforms,//added
        location, //added
        occupation, //added
      };

      // Create and sign the token
      const authToken = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken });
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
  
  } )

   //added an if because the data just need the game one time

  //   User.findById(req.user._id)
  //     .then((user) => {
        
  //       if (!user.GamesLibrary.includes(gameToAdd)) {
          
  //         user.GamesLibrary.push(gameToAdd);
  
        
  //         return user.save();
  //       } else {
     
  //         return user;
  //       }
  //     })
  //     .then((updatedUser) => {
  //       res.json(updatedUser);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.json(err);
  //     });
  // });

/*Delete a game*/

router.delete('/delete-game/:gameId', isAuthenticated, (req, res, next) => {
  const gameToDelete = req.params.gameId;

  User.findById(req.user._id)
    .then(async (user) => {
      // Check if the game is in the library


        // If the game is found, remove it from the library
        user.gamesLibrary = user.gamesLibrary.filter((game) => game._id != gameToDelete);

        // Save the updated user
        return await user.save();

    })
    .then((updatedUser) => {
      const { 
        email, 
        username, 
        photo, 
        _id,
        friends,   //added
        gamesLibrary, //added
        description, //added
        platforms,//added
        location, //added
        occupation, //added
      } = updatedUser;

      // Create an object that will be set as the token payload
      const payload = { 
        _id,
        email, 
        username, 
        photo,
        friends,   //added
        gamesLibrary, //added
        description, //added
        platforms,//added
        location, //added
        occupation, //added
      };

      // Create and sign the token
      const authToken = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

module.exports = router;