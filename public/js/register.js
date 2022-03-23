window.onload = function (){
//window.addEventListener('load', function () {
    //let form = document.querySelector('#form')
    
    //VARIABLES
    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let phone = document.querySelector("#phone");
    let adress = document.querySelector("#adress");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    //let avatar = document.getElementById('input.avatar');
    let inputs = document.querySelectorAll(".inputs2")

    
       const validacionesinputs = () => {
        
            //VALIDACION NOMBRE
            let campoNombreValido = firstName.value.trim();
    
            if (campoNombreValido.length < 4 ){
                firstName.classList.add ("error")
                firstName.classList.remove ("success")
               }
            let regex = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/
    
            if (!regex.test(campoNombreValido)){
                firstName.classList.add ("error")
                firstName.classList.remove ("success")
            
              } else{ 
                firstName.classList.add ("success")
            
              } 
    
            //VALIDACION APELLIDO           
            let campoApellidoValido = lastName.value.trim();
    
            if (campoApellidoValido.length < 4 ){
                lastName.classList.add ("error")
                lastName.classList.remove ("success")
              }
                let regexs = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/
    
            if (!regexs.test(campoApellidoValido)){
                lastName.classList.add ("error")
                lastName.classList.remove ("success")
            
               } else{ 
                   lastName.classList.add ("success")        
                } 
    
    
             //VALIDACION EMAIL
            let campoEmailValido = email.value.trim();
    
            if (campoEmailValido.length < 1 ){
                email.classList.add ("error")
                email.classList.remove ("success")
              }
                let regexx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    
            if (!regexx.test(campoEmailValido)){
                email.classList.add ("error")
                email.classList.remove ("success")
            
             } else{ 
                email.classList.add ("success")        
               } 
    

            //VALIDACION PHONE
            let campoPhoneValido = phone.value.trim();
    
               if (campoPhoneValido.length < 6 ){
                phone.classList.add ("error")
                phone.classList.remove ("success")
                 }
            let regextp = /^.(?=.{6,})(?=.[0-9-.]).*$/
               if (!regextp.test(campoPhoneValido)){
                phone.classList.add ("error")
                phone.classList.remove ("success")
               
                 } else{ 
                    phone.classList.add ("success")        
                  } 

            //VALIDACION ADRESS
            let campoAdressValido = adress.value.trim();
    
            if (campoAdressValido.length < 6 ){
            adress.classList.add ("error")
            adress.classList.remove ("success")
                 }
                 let regextt = /^.(?=.{6,})(?=.[a-zA-Z0-9-.]).*$/

            if (!regextt.test(campoAdressValido)){
            adress.classList.add ("error")
            adress.classList.remove ("success")
               
            } else{ 
            adress.classList.add ("success")        
            } 
    
             
    
             //VALIDACION PASSWORD      
            let campoPasswordValido = password.value.trim();
    
            if (campoPasswordValido.length < 6 ){
                password.classList.add ("error")
                password.classList.remove ("success")
                password.innerHTML= "El campo debe contener minimo 6 caracteres, 1 letra, 1 número y 1 character especial"
              }
                let regext = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
            if (!regext.test(campoPasswordValido)){
                password.classList.add ("error")
                password.classList.remove ("success")
            
              } else{ 
                 password.classList.add ("success")        
               } 
            }
 
             inputs.forEach((item)  => {       
                item.addEventListener("keydown" , validacionesinputs)    
                item.addEventListener("click" , validacionesinputs)                 
                item.addEventListener("blur" , validacionesinputs)
               })
    
}