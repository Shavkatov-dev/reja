/**
 * REJA - Plan Management Application
 * 
 * This is the main Express.js server file that handles:
 * - Server initialization and middleware configuration
 * - MongoDB database connection
 * - RESTful API endpoints for CRUD operations on plans/items
 * - User data loading from JSON file
 * - View rendering using EJS templating engine
 */

console.log('Web serverni boshlash');

// ============================================================================
// DEPENDENCIES & MODULES
// ============================================================================

const express = require('express');
const app = express();
const fs = require("fs");

// ============================================================================
// USER DATA LOADING
// ============================================================================

/**
 * Stores user information loaded from JSON file
 * Used for rendering author page and other user-related views
 */
let user;

/**
 * Loads user data from JSON file asynchronously
 * This runs once when the server starts
 */
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        console.log('ERROR:', err);
    } else {
        user = JSON.parse(data);
    }
});

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

/**
 * MongoDB database connection instance
 * The db() method returns the database connection object
 */
const db = require("./server").db();
const mongodb = require("mongodb");

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

/**
 * Serves static files (CSS, JS, images) from the 'public' directory
 * This allows the frontend to access files like browser.js, styles.css, etc.
 */
app.use(express.static("public"));

/**
 * Parses incoming JSON payloads in request bodies
 * Allows the server to read JSON data sent from the frontend
 */
app.use(express.json());

/**
 * Parses URL-encoded form data (application/x-www-form-urlencoded)
 * extended: true allows parsing of nested objects
 */
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// VIEW ENGINE CONFIGURATION
// ============================================================================

/**
 * Sets the directory where EJS template files are located
 */
app.set('views', 'views');

/**
 * Sets EJS as the templating engine for rendering views
 * EJS files (.ejs) will be processed and converted to HTML
 */
app.set('view engine', 'ejs');

// ============================================================================
// API ROUTES - CRUD OPERATIONS
// ============================================================================

/**
 * POST /create-item
 * Creates a new plan/item in the database
 * 
 * @route POST /create-item
 * @body {string} reja - The plan/item text to create
 * @returns {Object} The newly created item with its MongoDB _id
 */
app.post('/create-item', (req, res) => {
    console.log('user entered /create-item');
    console.log(req.body);
    
    // Extract the plan text from the request body
    const new_reja = req.body.reja;
    
    // Insert the new plan into the MongoDB 'plans' collection
    db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
        // Return the newly created item (data.ops[0] contains the inserted document)
        res.json(data.ops[0]);
    });
});

/**
 * POST /delete-item
 * Deletes a plan/item from the database by its ID
 * 
 * @route POST /delete-item
 * @body {string} id - MongoDB ObjectId of the item to delete
 * @returns {Object} {state: "success" | "invalid_id" | "error" | "not_found"}
 */
app.post("/delete-item", (req, res) => {
    const id = req.body.id;

    // Validate that the provided ID is a valid MongoDB ObjectId format
    if (!mongodb.ObjectId.isValid(id)) {
        return res.status(400).json({ state: "invalid_id" });
    }

    // Delete the item from the database
    db.collection("plans").deleteOne(
        { _id: new mongodb.ObjectId(id) },
        function (err, result) {
            // Handle database errors
            if (err) {
                return res.status(500).json({ state: "error" });
            }

            // Check if any document was actually deleted
            if (result.deletedCount === 0) {
                return res.status(404).json({ state: "not_found" });
            }

            // Successfully deleted
            res.json({ state: "success" });
        }
    );
});

/**
 * POST /edit-item
 * Updates an existing plan/item in the database
 * 
 * @route POST /edit-item
 * @body {string} id - MongoDB ObjectId of the item to update
 * @body {string} new_input - The new text content for the item
 * @returns {Object} {state: "success"}
 */
app.post("/edit-item", (req, res) => {
    const data = req.body;
    const id = req.body.id;
    console.log(data);
    
    // Update the item using findOneAndUpdate
    // $set operator replaces the 'reja' field with the new value
    db.collection("plans").findOneAndUpdate(
        { _id: new mongodb.ObjectId(id) },
        { $set: { reja: data.new_input } },
        function (err, data) {
            res.json({ state: "success" });
        }
    );
});

/**
 * POST /clean-all
 * Deletes ALL plans/items from the database
 * 
 * WARNING: This is a destructive operation that removes all data!
 * Should be used with caution, typically for testing or reset purposes.
 * 
 * @route POST /clean-all
 * @returns {Object} {state: "hamma rejalar ochirildi"} - Confirmation message
 * 
 * Note: deleteMany({}) with an empty filter object deletes all documents
 * in the collection. Consider adding authentication/authorization checks
 * in production to prevent unauthorized bulk deletions.
 */
app.post("/clean-all", (req, res) => {
    // Delete all documents from the 'plans' collection
    // Empty filter object {} means "match all documents"
    db.collection("plans").deleteMany({}, function (err, result) {
        // Return success message indicating all plans have been deleted
        res.json({ state: "all plans deleted" });
    });
});

// ============================================================================
// VIEW ROUTES
// ============================================================================

/**
 * GET /author
 * Renders the author page with user information
 * 
 * @route GET /author
 * @renders author.ejs template with user data
 */
app.get('/author', (req, res) => {
    res.render("author", { user: user });
});

/**
 * GET /
 * Home page route - displays all plans/items
 * 
 * @route GET /
 * @renders reja.ejs template with all items from the database
 */
app.get("/", function (req, res) {
    console.log('user entered /');
    
    // Fetch all plans from the database and convert to array
    db.collection("plans").find().toArray((err, data) => {
        if (err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log(data);
            // Render the reja.ejs template with the items data
            res.render("reja", { items: data });
        }
    });
});

// ============================================================================
// EXPORT
// ============================================================================

/**
 * Export the Express app instance
 * This allows other modules (like server.js) to use this configured app
 */
module.exports = app;



