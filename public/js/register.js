window.addEventListener('load', function () {
    let form = document.querySelector('form.formulario')
    
    const data = {
        firstName:e.target[0].value.trim().toLowerCase(),
        lastName:e.target[1].value.trim().toLowerCase(),
        password:e.target[2].value,
        email:e.target[4].value
    }
    console.log('data:',data);

    const url = 'http://localhost:3000/users/register';
    fetch( url, {
      method:'POST',
      body: JSON.stringify(data),
      headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));


    //VARIABLES
    let firstName = document.querySelector('input.name');
    let lastName = document.querySelector('input.last-name');
    let phone = document.querySelector('input.phone');
    let adress = document.querySelector('input.adress');
    let email = document.querySelector('input.email');
    let avatar = document.getElementById('input.avatar');
    let campos = document.querySelectorAll("form.control")

    
    // EVENTOS PARA FORMULARIO
    for (let i = 0; i < campos.length; i++){
        campos[i].addEventListener("focus", function () {
            this.style.borderColor= "red";
        })

        campos[i].addEventListener("change", function () {
            this.style.backgroundColor = 'green';
        })

        campos[i].addEventListener("blur", function () {
            if (!campos.value.length) {
                this.style.display = 'unset';
                campos[i].innerHTML = "Completa este campo";
            };
        })
    }


    // VALIDACIONES
    form.addEventListener("submit", function (e) {  
        let errores = [];

        if (firstName.value === "") {
            errores.push("Completa este campo");
        } else if(firstName.value <2){
            errores.push ("El campo nombre debe tener al menos 2 caracteres");
        }

        if (lastName.value === "") {
            errores.push ("Completa este campo");
        } else if(lastName.value <2){
            errores.push ("El campo apellido debe tener al menos 2 caracteres");
        }

        if (phone.value === "") {
            errores.push ("Completa este campo");
        } else if(lastName.value <8){
            errores.push ("El campo teléfono debe tener al menos 8 caracteres");
        }

        if (adress.value === "") {
            errores.push ("Completa este campo");
        } else if(adress.value <6){
            errores.push ("El campo domicilio debe tener al menos 6 caracteres");
        }

        if (email.value < 2) {
            errores.push("El email ingresado es muy corto");
        } else {
            if (!ValidateEmail(email.value)) {
                errores.push('La dirección de email debe ser una valida')
            }
        }

        if (!ValidateExtension(avatar.value)) {
            errores.push("El archivo a adjuntar no posee extension valida");
        }


        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector("section.errores ul");
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML+= "<li>" + errores[i] + "</li>";
        }


    };

    })
})

function ValidateEmail(input) {
    if (input.includes('@')) {
        if (input.slice(-4) == ".com")
            return true
    }
    return false;
}

function ValidateExtension(input) {
    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.PNG'];
        if ( acceptedExtensions.includes(input.slice(-4)) )
            return true
    return false;
}