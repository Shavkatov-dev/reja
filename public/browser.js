/**
 * REJA - Frontend JavaScript
 * 
 * This file handles all client-side interactions for the plan management application:
 * - Creating new plans/items
 * - Editing existing plans/items
 * - Deleting plans/items
 * - Dynamic DOM manipulation
 * 
 * Dependencies: Axios (for HTTP requests), Bootstrap (for styling)
 */

console.log('Frontend JS started');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generates HTML template for a plan/item list item
 * 
 * @param {Object} item - The plan/item object from the database
 * @param {string} item._id - MongoDB ObjectId of the item
 * @param {string} item.reja - The plan/item text content
 * @returns {string} HTML string representing a list item with edit/delete buttons
 */
function itemTemplate(item) {
    return `
    <li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
      <span class="item-text">${item.reja}</span>
      <div>
        <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">
          Edit
        </button>
        <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </li>`;
}

// ============================================================================
// DOM ELEMENT REFERENCES
// ============================================================================

/**
 * Reference to the input field where users type new plans/items
 * Used to get the value when creating new items and to clear/reset the field
 */
let createField = document.getElementById("create-field");

// ============================================================================
// CREATE ITEM FUNCTIONALITY
// ============================================================================

/**
 * Handles form submission for creating new plans/items
 * 
 * Event Listener: Listens for 'submit' event on the create form
 * 
 * Process:
 * 1. Prevents default form submission (page reload)
 * 2. Sends POST request to /create-item endpoint with the plan text
 * 3. On success: Adds the new item to the list and clears the input field
 * 4. On error: Logs error message to console
 */
document.getElementById("create-form").addEventListener('submit', function(e) {
    // Prevent the default form submission which would reload the page
    e.preventDefault();

    // Send POST request to create a new item
    axios
        .post('/create-item', { reja: createField.value })
        .then((response) => {
            // Success: Add the new item to the end of the list
            document
                .getElementById("item-list")
                .insertAdjacentHTML("beforeend", itemTemplate(response.data));
            
            // Clear the input field and refocus it for the next entry
            createField.value = "";
            createField.focus();
        })
        .catch((err) => {
            // Error: Log message to console
            console.log("Please try again!");
        });
});

// ============================================================================
// DELETE & EDIT FUNCTIONALITY (Event Delegation)
// ============================================================================

/**
 * Event delegation handler for delete and edit operations
 * 
 * Uses event delegation on the document to handle clicks on dynamically
 * created buttons. This is necessary because items are added to the DOM
 * dynamically after page load.
 * 
 * Event Listener: Listens for all 'click' events on the document
 * 
 * Handles two types of clicks:
 * 1. Delete button clicks (class: "delete-me")
 * 2. Edit button clicks (class: "edit-me")
 */
document.addEventListener('click', function (e) {

    // ========================================================================
    // DELETE OPERATION
    // ========================================================================
    
    /**
     * Checks if the clicked element is a delete button
     * If yes, prompts user for confirmation and deletes the item
     */
    if (e.target.classList.contains("delete-me")) {
        // Confirm deletion with user before proceeding
        if (confirm("Are you sure you want to delete this item?")) {
            // Get the item ID from the button's data-id attribute
            const itemId = e.target.getAttribute("data-id");
            
            // Send DELETE request to the server
            axios
                .post("/delete-item", { id: itemId })
                .then(response => {
                    console.log(response.data);
                    // Remove the list item from the DOM
                    // parentElement.parentElement navigates: button -> div -> li
                    e.target.parentElement.parentElement.remove();
                })
                .catch(err => {
                    console.log("Please try again!");
                });
        }
    }

    // ========================================================================
    // EDIT OPERATION
    // ========================================================================
    
    /**
     * Checks if the clicked element is an edit button
     * If yes, prompts user for new text and updates the item
     */
    if (e.target.classList.contains("edit-me")) {
        // Find the current text content of the item
        const currentText = e.target.parentElement.parentElement.querySelector(".item-text").innerHTML;
        
        // Prompt user for new text, pre-filling with current text
        let userInput = prompt("Enter the new text", currentText);
        
        // Only proceed if user provided input (didn't cancel or leave empty)
        if (userInput) {
            // Get the item ID from the button's data-id attribute
            const itemId = e.target.getAttribute("data-id");
            
            // Send POST request to update the item
            axios
                .post("/edit-item", {
                    id: itemId,
                    new_input: userInput,
                })
                .then(response => {
                    console.log(response);
                    // Update the displayed text in the DOM immediately
                    e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
                })
                .catch(err => {
                    console.log("Please try again!");
                });
        }
    }
});

// ============================================================================
// CLEAN ALL FUNCTIONALITY
// ============================================================================

/**
 * Handles the "Clean All" button click event
 * 
 * This function deletes ALL plans/items from both the database and the UI.
 * It's a destructive operation that should be used carefully.
 * 
 * Event Listener: Listens for 'click' event on the element with id "clean-all"
 * 
 * Process:
 * 1. Shows a confirmation dialog to prevent accidental deletion
 * 2. If confirmed: Sends POST request to /clean-all endpoint
 * 3. On success: Clears the entire item list from the DOM
 * 4. On error: Logs error message to console
 * 
 * Note: This permanently removes all data. Consider adding additional
 * confirmation steps or admin-only access in production environments.
 */
document.getElementById("clean-all").addEventListener('click', function(e) {
    // Show confirmation dialog before proceeding with bulk deletion
    if (confirm("Are you sure you want to delete all items?")) {
        // Send POST request to delete all items from the database
        axios.post("/clean-all")
            .then(response => {
                console.log(response.data);
                // Clear the entire list from the DOM by setting innerHTML to empty string
                // This removes all list items from the page immediately
                document.getElementById("item-list").innerHTML = "";
            })
            .catch(err => {
                // Error: Log message to console if deletion fails
                console.log("Please try again!");
            });
    }
});