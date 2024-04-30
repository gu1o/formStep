const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
const formStep2 = document.getElementById("form-step-2");
const formStep3 = document.getElementById("form-step-3");
const userType1 = document.getElementById("useyType1");
const userType2 = document.getElementById("useyType2");
const userType3 = document.getElementById("useyType3");
const hiddenInput = document.getElementById("hidden");
const actionButton = firstForm.querySelector(".btn");
const backButton = document.querySelector(".btn-back");
const nextButton = document.querySelector(".btn-next");
const addPhoneButton = document.querySelector(".add-phone-btn");
const phoneNumberFields = document.getElementById("phone-number-fields");
const finishButton = formStep3.querySelector(".btn-next"); //botão de concluir cadastro
const backButtonStep3 = formStep3.querySelector(".btn-back"); // Botão de voltar no terceiro passo


// evento para alternar visibilidade dos painéis de sign in e sign up
signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

// bloqueia o envio padrão do formulário no primeiro e segundo passos
firstForm.addEventListener("submit", (e) => e.preventDefault());
secondForm.addEventListener("submit", (e) => e.preventDefault());


// mask telefone
function mascara(o, f) {
    v_obj = o;
    v_fun = f;
    setTimeout(execmascara, 1);
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value);
}

function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}

window.onload = function() {
    var telefones = document.querySelectorAll('input[type="tel"]');
    telefones.forEach(function(telefone) {
        telefone.onkeyup = function() {
            mascara(this, mtel);
        };
    });
}


// mask CNPJ
function addCNPJMask() {
    const cnpjInput = document.getElementById('CNPJ');
    cnpjInput.addEventListener('input', function (e) {
        setTimeout(() => {
            const oldValue = e.target.value;
            var newValue = oldValue.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
            var formattedValue = !newValue[2] ? newValue[1] : newValue[1] + '.' + newValue[2] + '.' + newValue[3] + '/' + newValue[4] + (newValue[5] ? '-' + newValue[5] : '');

            if (oldValue !== formattedValue) {
                e.target.value = formattedValue;
            }
        }, 10);
    });
}

// adiciona eventos de clique aos radios para mostrar ou esconder os campos adicionais
[userType1, userType2, userType3].forEach(radio => {
    radio.addEventListener("click", () => {
        if (userType2.checked || userType3.checked) {
            hiddenInput.type = "text";
            hiddenInput.id = "CNPJ"
            hiddenInput.placeholder = "CNPJ";
            hiddenInput.style.display = 'block';
            hiddenInput.required = true
            actionButton.textContent = "Continuar";
            actionButton.dataset.step = "1";

            //chamada da mask de cnpj
            addCNPJMask();
        } else {
            hiddenInput.type = "hidden";
            hiddenInput.style.display = 'none';
            actionButton.textContent = "Cadastrar-se";
            actionButton.dataset.step = "0";
        }
    });
});




// lógica para avançar entre os passos do formulário
actionButton.addEventListener("click", function(e) {
    e.preventDefault();
    const step = actionButton.dataset.step;
    if (step === "1" && (userType2.checked || userType3.checked)) {
        firstForm.style.display = 'none';
        formStep2.style.display = 'block';
        actionButton.textContent = "Cadastrar-se";
        actionButton.dataset.step = "2";
    } else if (step === "2") {
        formStep2.style.display = 'none';
        firstForm.style.display = 'block';
        actionButton.textContent = "Continuar";
        actionButton.dataset.step = "1";
    }
});

// Evento para voltar ao primeiro formulário
backButton.addEventListener("click", function() {
    formStep2.style.display = 'none';
    firstForm.style.display = 'flex';
    actionButton.textContent = userType2.checked || userType3.checked ? "Continuar" : "Cadastrar-se";
    actionButton.dataset.step = userType2.checked || userType3.checked ? "1" : "0";
});

// Evento para avançar do segundo passo (implementar lógica se necessário para o terceiro passo)
nextButton.addEventListener("click", function() {
    formStep2.style.display = 'none';
    formStep3.style.display = 'block';
});

// Atualizando o evento do botão principal para lidar corretamente com o 'Next' e 'Sign Up'
actionButton.addEventListener("click", function(e) {
    e.preventDefault();
    const step = actionButton.dataset.step;
    if (step === "1" && (userType2.checked || userType3.checked)) {
        firstForm.style.display = 'none';
        formStep2.style.display = 'block';
    }
});

// lógica de remover input de telefone
function updateRemoveButtons() {
    // Seleciona todos os botões de remover
    document.querySelectorAll(".remove-phone-btn").forEach(button => {
        button.removeEventListener("click", removePhoneGroup);
        button.addEventListener("click", removePhoneGroup);
    });
}

// lógica para restaurar a div do input de telefone
function removePhoneGroup(event) {
    // O botão que foi clicado
    const buttonClicked = event.target;
    // O grupo de input do telefone a ser removido
    const groupToRemove = buttonClicked.closest(".phone-input-group");
    // Remove o grupo
    groupToRemove.remove();
}

addPhoneButton.addEventListener("click", () => {
    // Cria um novo grupo de input para o telefone
    const newInputGroup = document.createElement("div");
    newInputGroup.classList.add("phone-input-group");

    // cria o input
    const newPhoneInput = document.createElement("input");
    newPhoneInput.setAttribute("type", "tel");
    newPhoneInput.setAttribute("placeholder", "Telefones de Contato");
    newPhoneInput.classList.add("input", "phone-input");

    // cria o botão de remover
    const newRemoveButton = document.createElement("button");
    newRemoveButton.type = "button";
    newRemoveButton.classList.add("remove-phone-btn");
    newRemoveButton.textContent = "-";

    // adiciona o novo input e o botão de remover ao novo grupo
    newInputGroup.appendChild(newPhoneInput);
    newInputGroup.appendChild(newRemoveButton);

    // adiciona o novo grupo ao container dos telefones
    phoneNumberFields.appendChild(newInputGroup);

    updateRemoveButtons();
});


backButtonStep3.addEventListener("click", function() {
    formStep3.style.display = 'none';
    formStep2.style.display = 'block';
});

// botão para cadastrar
finishButton.addEventListener("click", function(e) {
    e.preventDefault();

    // criar lógica para armazenar e enviar dados preenchidos do form
    
    alert("Cadastro concluído com sucesso!");
});