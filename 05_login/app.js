import {app} from './firebase.js'
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const auth =getAuth(app);


const btncrearCuenta=document.querySelector("#btncrearCuenta");

btncrearCuenta.addEventListener('click', async(e)=>{
e.preventDefault();
const email=document.querySelector("#iniciarEmail");
const password=document.querySelector("#crearPassword");
console.log(email.value, password.value);
var myModalEl = document.getElementById('crearModal');
var modal =bootstrap.Modal.getInstance(myModalEl)
try{
    const respuesta=await createUserWithEmailAndPassword(auth, email.value, password.value)
console.log(respuesta.user);
Swal.fire({
    icon:'success',
    title:'EXITO',
    text:'La cuenta se registro correctamente!!'
})
email.value='';
password.value='';
modal.hide();
} catch (error){
    console.log(error.code);
    const code=error.code;
    if(code=='auth/invalid-email'){
        Swal.fire('Correo Electonico invalido')
    }
    if(code=='auth/weak-password' ){
        Swal.fire('password invalido')
    }
    if(code=='auth/email-already-in-use' ){
        Swal.fire('Correo Electronuico ya esta en uso!!')
    }
}
}); 