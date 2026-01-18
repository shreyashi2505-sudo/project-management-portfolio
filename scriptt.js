
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
fetch("http://127.0.0.1:3000/save-feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    rating,
    message: msg
  })
})
.then(() => {
  alert("Thank you for your feedback!");
  document.querySelector("#feedback form").reset();
})
.catch(() => {
  alert("Error saving feedback");
});

return false;
}
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



