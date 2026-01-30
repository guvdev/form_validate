// Codigo desenvolvido por mim para fins de estudo e pratica de validacao de formulario

const form = document.querySelector("#my_form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
    const re = /^[0-9]+$/;
    return re.test(phone);
};

const showError = (inputId, spanId, message) => {
    const span = document.getElementById(spanId);
    const input = document.getElementById(inputId);
    span.innerHTML = `${errorIcon} ${message}`;
    input.classList.remove("border-green-500");
    input.classList.add("border-red-500");
};

const hideError = (inputId, spanId) => {
    const span = document.getElementById(spanId);
    const input = document.getElementById(inputId);
    input.classList.remove("border-red-500");
    input.classList.add("border-green-500");
    span.innerHTML = "";
};



const validate = (email, phone, name) => {
    let valid = true;
    if (name.trim().length < 3) {
        showError("name", "erro-name", "O nome deve ter pelo menos 3 caracteres.");
        valid = false;
    } else {
        hideError("name", "erro-name");
    }
    if (!validatePhone(phone) || phone.trim().length < 10) {
        showError("phone", "erro-phone", "Telefone inválido. Deve conter pelo menos 10 números e apenas dígitos.");
        valid = false;
    } else {
        hideError("phone", "erro-phone");
    }
    if (!validateEmail(email)) {
        showError("email", "erro-email", "Por favor, insira um email válido.");
        valid = false;
    } else {
        hideError("email", "erro-email");
    }
    return valid;
};


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameValue = document.querySelector("#name").value;
    const emailValue = document.querySelector("#email").value;
    const phoneValue = document.querySelector("#phone").value;

    if (validate(emailValue, phoneValue, nameValue)) {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                name: nameValue,
                email: emailValue,
                phone: phoneValue
            })
        });
        const btnsub = document.getElementById("btnsub");
        const divbg = document.getElementById("divbg");
        const h1 = document.querySelector("h1");
        divbg.style.backgroundColor = "lightgreen";
        btnsub.style.backgroundColor = "green";
        h1.style.color = "green";

        btnsub.value = "✔";
        setTimeout(() => {
            btnsub.style.backgroundColor = "";
            divbg.style.backgroundColor = "";
            h1.style.color = "";
            btnsub.value = "Submit";
            form.reset();
        }, 2000);
    };
});
