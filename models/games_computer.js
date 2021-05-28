const mongoose = require('mongoose');

const GamesComputer = mongoose.model("Games",{
    _id: {
        type: String
    },
    player1_wins:{
        type:Number,
        default: 0
    },
    player1_losses:{
        type:Number,
        default: 0
    },
    player1_draws:{
        type:Number,
        default: 0
    },
    player2_wins:{
        type:Number,
        default: 0
    },
    player2_losses:{
        type:Number,
        default: 0
    },
    player2_draws:{
        type:Number,
        default: 0
    },
    player2_type: {
        type: String
    }
});

module.exports = GamesComputer;

