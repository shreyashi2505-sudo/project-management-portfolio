
function showSection(id, el) {

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');


  document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');

  
  const nav = document.querySelector(".navbar ul");
  if (nav.classList.contains("show")) {
    nav.classList.remove("show");
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.remove("open");
  }
}


function toggleMenu(el) {
  const nav = document.querySelector(".navbar ul");
  nav.classList.toggle("show");
  el.classList.toggle("open"); 
}


function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      modal.style.display = "none";
    }
  });
});

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

function validateFeedback() {
  const nameField = document.getElementById("fname").parentElement;
  const emailField = document.getElementById("femail").parentElement;
  const ratingField = document.getElementById("rating").parentElement;
  const msgField = document.getElementById("fmsg").parentElement;

  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const rating = document.getElementById("rating").value;
  const msg = document.getElementById("fmsg").value.trim();

  const error = document.getElementById("error");
  error.textContent = "";
  document.querySelectorAll(".field").forEach(f => f.classList.remove("error", "success"));

  let valid = true;

  if (!name) {
    nameField.classList.add("error");
    valid = false;
  } else {
    nameField.classList.add("success");
  }

  if (!email) {
    emailField.classList.add("error");
    valid = false;
  } else {
    emailField.classList.add("success");
  }

  if (!rating) {
    ratingField.classList.add("error");
    valid = false;
  } else {
    ratingField.classList.add("success");
  }

  if (msg.length < 10) {
    msgField.classList.add("error");
    valid = false;
  } else {
    msgField.classList.add("success");
  }

  if (!valid) {
    error.textContent = "Please fill all fields correctly (min 10 characters)";
    return false;
  }
// Save to local storage
  const feedbackData = {
    name,
    email,
    rating,
    message: msg,
    timestamp: new Date().toISOString()
  };
  
  // Get existing feedback from local storage
  let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedbacks.push(feedbackData);
  
  // Save updated feedbacks to local storage
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  
  alert("Thank you for your feedback! It has been saved locally.");
  document.querySelector("#feedback form").reset();
  document.querySelectorAll(".field").forEach(f => f.classList.remove("success"));
  
  // Display the updated feedback list
  displayFeedbacks();

return false;
}
function displayFeedbacks() {
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  const feedbackList = document.getElementById('feedbackList');
  
  if (feedbacks.length === 0) {
    feedbackList.innerHTML = '<p class="no-feedback">No feedback submitted yet.</p>';
    return;
  }
  
  // Sort by timestamp (newest first)
  feedbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  feedbackList.innerHTML = feedbacks.map((feedback, index) => {
    const date = new Date(feedback.timestamp);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    const stars = '⭐'.repeat(parseInt(feedback.rating));
    
    return `
      <div class="feedback-item">
        <div class="feedback-header">
          <strong>${feedback.name}</strong>
          <span class="feedback-rating">${stars}</span>
        </div>
        <div class="feedback-meta">
          <span class="feedback-email">${feedback.email}</span>
          <span class="feedback-date">${formattedDate}</span>
        </div>
        <div class="feedback-message">${feedback.message}</div>
        <button class="btn-delete" onclick="deleteFeedback(${index})">Delete</button>
      </div>
    `;
  }).join('');
}

function deleteFeedback(index) {
  if (confirm('Are you sure you want to delete this feedback?')) {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.splice(index, 1);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    displayFeedbacks();
  }
}

function clearAllFeedbacks() {
  if (confirm('Are you sure you want to delete all feedback?')) {
    localStorage.removeItem('feedbacks');
    displayFeedbacks();
  }
}

// Display feedbacks when page loads
document.addEventListener('DOMContentLoaded', function() {
  displayFeedbacks();
});

function calculateCost() {
  let total = 0;

  document.querySelectorAll(".service").forEach(item => {
    if (item.checked) {
      total += parseInt(item.value);
    }
  });

  

  document.getElementById("totalCost").innerText = total;
}

function toggleSection() {
  const section = document.getElementById("details");
  section.style.display =
    section.style.display === "none" ? "block" : "none";
}





