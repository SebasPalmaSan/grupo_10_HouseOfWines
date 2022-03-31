window.onload = function (){
//window.addEventListener("load", function () {

    let file = document.querySelector("#file")
        
        //VALIDACION IMAGE
        file.addEventListener("change", function(e){
            let target = e.target;
            let value = target.files;
            let errorFile = document.querySelector("#errorFile")
            let regex = /^image\//;
        
            if(!regex.test(value[0].type)){
                target.classList.add("error")
                errorFile.classList.add("error")
                errorFile.innerHTML = "El archivo no es una imagen con formato valido"
            }else{
                target.classList.add("sucess")
                errorFile.classList.remove("error")
                errorFile.classList.add("sucess")
                errorFile.innerHTML = "Archivo con formato valido"
                }
            })
    
}