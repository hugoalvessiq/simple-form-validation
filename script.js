const form = document.getElementById("register-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");

// ======= Validation Functions =======

function showError(input, message) {
 // Select the .form-control element closest to the input.
  const formControl = input.closest('.form-control');
  formControl.classList.add('error');
  formControl.classList.remove('success');

  const small = formControl.querySelector('small');
  small.innerText = message;
  small.style.visibility = 'visible';
}

function showSuccess(input) {
 const formControl = input.closest('.form-control');
  formControl.classList.add('success');
  formControl.classList.remove('error');

  const small = formControl.querySelector('small');
  small.innerText = '';
  small.style.visibility = 'hidden';
}

function checkEmail(input) {
  // const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(input.value.trim())) {
    showError(input, "E-mail inválido");
  } else {
    showSuccess(input);
  }
}

function checkPassword(input) {
  if (input.value.trim().length < 6) {
    showError(input, "Senha deve ter no mínimo 6 caracteres");
  } else {
    showSuccess(input);
  }
}

// ======= Events =======

// Real time validation
form.addEventListener("input", (e) => {
  if (e.target.id === "email") checkEmail(e.target);
  if (e.target.id === "password") checkPassword(e.target);
});

// Show/Hide password
togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.innerHTML =
    type === "password"
      ? '<i class="fa-solid fa-eye"></i>'
      : '<i class="fa-solid fa-eye-slash"></i>';
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkEmail(email);
  checkPassword(password);

  const errors = form.querySelectorAll(".form-control.error");
  console.log(errors.length);
  
  if (errors.length == 0) {
    successMessage.style.display = "block";
    successMessage.classList.add("fade-up");
    form.reset();

    // Clean up icons and classes afte 2 seconds
    setTimeout(() => {
      document.querySelectorAll(".form-control").forEach((fc) => {
        fc.classList.remove("success");
      });
      successMessage.style.display = "none";
    }, 2500);
  } else if (errors.length > 0 ) {
    errorMessage.style.display = "block";
    errorMessage.classList.add("fade-up");

    setTimeout(() => {
      document.querySelectorAll(".form-control").forEach((fc) => {
        fc.classList.remove("error");
      });
      errorMessage.style.display = "none";
    }, 2500);
  }
  
});
