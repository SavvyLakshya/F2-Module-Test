// Define blog posts array
let blogPosts = [];

// Get main page element
const mainPage = document.getElementById("main-page");

// Get modal element and close button
const createBlogModal = document.getElementById("create-blog-modal");
const closeModalBtn = document.getElementById("close-modal");

// Get create blog button and form
const createBlogBtn = document.getElementById("create-blog-btn");
const blogForm = document.getElementById("blog-form");

// Add event listeners to buttons
createBlogBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
blogForm.addEventListener("submit", createBlogPost);

// Function to open modal
function openModal() {
  createBlogModal.style.display = "block";
}

// Function to close modal
function closeModal() {
  createBlogModal.style.display = "none";
  blogForm.reset();
}

// Function to create new blog post
function createBlogPost(e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById("blog-title").value;
  const description = document.getElementById("blog-description").value;

  // Create new blog post object
  const blogPost = {
    title,
    description
  };

  // Add blog post object to array
  blogPosts.push(blogPost);

  // Close modal and reset form
  closeModal();

  // Render blog posts
  renderBlogPosts();
}

// Function to render blog posts
function renderBlogPosts() {
  // Clear main page
  mainPage.innerHTML = "";

  // Loop through blog posts array and create HTML elements
  for (let i = 0; i < blogPosts.length; i++) {
    const blogPost = blogPosts[i];
    const blogPostHTML = `
      <div class="blog-post">
        <h2>${blogPost.title}</h2>
        <p>${blogPost.description}</p>
        <div class="button-group">
          <button class="edit-btn" data-index="${i}">Edit Post</button>
          <button class="delete-btn" data-index="${i}">Delete Post</button>
        </div>
      </div>
    `;
    mainPage.innerHTML += blogPostHTML;
  }
// Get edit and delete buttons
const editButtons = document.querySelectorAll(".edit-btn");
const deleteButtons = document.querySelectorAll(".delete-btn");

// Add event listeners to edit and delete buttons
editButtons.forEach((button) => {
button.addEventListener("click", editBlogPost);
});

deleteButtons.forEach((button) => {
button.addEventListener("click", deleteBlogPost);
});
}

// Function to edit blog post
function editBlogPost(e) {
// Get index of blog post in array
const index = e.target.dataset.index;

// Get blog post object
const blogPost = blogPosts[index];

// Set form values
document.getElementById("blog-title").value = blogPost.title;
document.getElementById("blog-description").value = blogPost.description;

// Open modal
openModal();

// Remove original blog post object from array
blogPosts.splice(index, 1);

// Update blog post object when form is submitted
blogForm.removeEventListener("submit", createBlogPost);
blogForm.addEventListener("submit", function(e) {
e.preventDefault();
const title = document.getElementById("blog-title").value;
const description = document.getElementById("blog-description").value;
const updatedBlogPost = {
title,
description
};
blogPosts.splice(index, 0, updatedBlogPost);
closeModal();
renderBlogPosts();
});
}

// Function to delete blog post
function deleteBlogPost(e) {
// Get index of blog post in array
const index = e.target.dataset.index;

// Remove blog post object from array
blogPosts.splice(index, 1);

// Render blog posts
renderBlogPosts();
}

// Function to load saved blog posts from local storage
function loadSavedBlogPosts() {
const savedBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));
if (savedBlogPosts) {
blogPosts = savedBlogPosts;
renderBlogPosts();
}
}

// Function to save blog posts to local storage
function saveBlogPosts() {
localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
}

// Load saved blog posts when page loads
window.addEventListener("load", loadSavedBlogPosts);

// Save blog posts to local storage when page is unloaded
window.addEventListener("unload", saveBlogPosts);
 
