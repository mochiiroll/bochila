import {app} from './firebase.js'
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const auth =getAuth(app);


const btncrearCuenta=document.querySelector("#btncrearCuenta");

btncrearCuenta.addEventListener('click', async(e)=>{
e.preventDefault();
const email=document.querySelector("#crearEmail");
const password=document.querySelector("#crearPassword");
console.log(email, password);


const respuesta=await createUserWithEmailAndPassword(auth, email, password)
console.log(respuesta.user);
});



