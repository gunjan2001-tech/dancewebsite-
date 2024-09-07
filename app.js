const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser"); // Not used, so can be removed

const app = express();
const port = 8000;

// Define mongoose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('contact', contactSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/contactdance', {  })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug', {});
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug', {});
});

app.post('/contact', async (req, res) => {
    try {
        const mydata = new Contact(req.body);
        await mydata.save();
        res.status(200).send("This item has been saved to the database");
    } catch (error) {
        console.error("Error saving to database:", error); // Log the error details
        res.status(400).send("This was not saved to database");
    }
});


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
