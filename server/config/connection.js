const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI2 || 'mongodb+srv://daestanii1997:NikitaKai@crafttracker.cosigbq.mongodb.net/?retryWrites=true&w=majority&appName=CraftTracker');

module.exports = mongoose.connection;