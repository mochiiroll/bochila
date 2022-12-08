import {app} from './firebase.js'

import { getAuth,
   createUserWithEmailAndPassword,
   GoogleAuthProvider, signInWithEmailAndPassword,
    onAuthStateChanged, signInWithPopup,
     signOut 
    } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


   

let user=null;
const auth = getAuth(app);

onAuthStateChanged(auth,(user)=>{

  const container=document.querySelector("#container");
  checarEstado(user);
  if(user){
    container.innerHTML=`<h2>${user.displayName}</h2>
    <p> ${user.email}</p><br>
    
    <button class="btn btn-outline-primary" id="btnAdd" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-check"></i>Agregar registro</button>
      <table class="table" onload="onGetAlumnos()">
        <thead class="table table-primary table-hover">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Grupo</th>
            <th scope="col">Debut</th>
            <th scope="col">Cumpleaños</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
            
          </tr>
        </thead>
        <tbody id="lista">
        </tbody>
      </table>
      <!--End table crud-->
    `
    const uid=user.uid;
  }else{
    container.innerHTML=`<h1>Registrarse porfavor</h1>`
  }

})

const btnGoogle=document.querySelector("#BtnCAG");
btnGoogle.addEventListener('click', async(e)=>{
e.preventDefault();
  const provider = new GoogleAuthProvider();
    try {
        const credencial=await signInWithPopup(auth, provider)
        user=credencial.user;
        const modalInstance = bootstrap.Modal.getInstance(btnGoogle.closest('.modal'));
        modalInstance.hide();
        checarEstado(user);
        console.log(credencial)
        Swal.fire({
            icon: 'success',
        title: 'Exito :D',
        text: 'Estas registrado',
        
    })
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
           title: 'Ops...',
            text: 'No es posible registrarse con google en estos momentos',
              })
    }

});

const checarEstado=(user=null)=>{
  console.log(user);
  if(user==null){
    document.querySelector("#iniciar").style.display="block";
    document.querySelector("#crear").style.display="block";
    document.querySelector("#cerrar").style.display="none";
  }
  else{
    document.querySelector("#iniciar").style.display="none";
    document.querySelector("#crear").style.display="none";
    document.querySelector("#cerrar").style.display="block";
  }
}



const btClose=document.querySelector("#cerrar");
btClose.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    await signOut(auth)
    checarEstado()
  }catch(error){
    console.log(error)
  }
});


const btnIniciar=document.querySelector("#BtnI");
btnIniciar.addEventListener('click', async(e)=>{
e.preventDefault();
const email=document.querySelector("#Iemail");
const password=document.querySelector("#IPass");
console.log(email.value,password.value);
try {
    const res=await signInWithEmailAndPassword(auth, email. value, password.value)
    console.log(res);
    Swal.fire({
        icon: 'success',
    title: 'Exito :D',
    text: 'Estas registrado',
        
     })
    var myModalEl = document.getElementById ('modLog');
        var modal=bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    const resII= await onAuthStateChanged (auth, (user)=>{
        const container=document.querySelector("#container");
        const Bbody=document.querySelector("#Bbody");
        if(user){
            container.innerHTML=`<h1>${user.email}</h1>`
            
            document.querySelector("#iniciar").style.display="none";
            document.querySelector("#crear").style.display="none";
            const uid=user.uid;
        }else{
container.innerHTML=`<h1>No hay usuario</h1>`
        }

          })
} catch (error) {
    Swal.fire({
        icon: 'error',
       title: 'Ops...',
        text: 'Revisa tu contraseña o tu correo',
          })
}

});

const btncrearcuenta=document.querySelector("#btncrear")

btncrearcuenta.addEventListener('click', async(e)=>{
    e.preventDefault();
const email=document.querySelector("#crearemail");
const password=document.querySelector("#crearcontra");
console.log(email.value,password.value);
var myModalEl=document.getElementById('crearModal');
var modal=bootstrap.Modal.getInstance(myModalEl)

try{
    const respuesta=await createUserWithEmailAndPassword (auth, email.value, password.value)
console.log(respuesta.user);
Swal.fire({
    icon: 'success',
    title: 'Exito :D',
    text: 'Cuenta creada',

  })
  email.value='';
  password.value=''
  modal.hide();
}catch (error){
console.log(error.code);
const code=error.code;
if (code=='auth/invalid-email'){
    Swal.fire({
        icon: 'error',
       
        text: 'Email invalido',
          })
}
if (code=='auth/weak-password'){
    Swal.fire({
        icon: 'error',
       
        text: 'Contraseña invalida',
          })
}
if (code=='auth/email-already-in-user'){
    Swal.fire({
        icon: 'error',
       
        text: 'Este email ya esta en uso',
          })

}
}

});