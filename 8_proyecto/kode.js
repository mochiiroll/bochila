import {app} from './firebase.js'

import { getAuth,
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPhoneNumber,
     signInWithPopup,
     signInAnonymously,
     signOut,
     RecaptchaVerifier
    } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


   

let user=null;
const auth = getAuth(app);

onAuthStateChanged(auth,(user)=>{

  const container=document.querySelector("#container");
  checarEstado(user);
  if(user){
    container.innerHTML=`
    <h2>${user.displayName}</h2>
    <p> ${user.email}</p>
    <p> ${user.phoneNumber}</p>
    
    <button class="btn btn-info" id="btnAdd" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-cloud-plus"></i> Agregar</button>
      <table class="table" onload="onGetAlumnos()">
        <thead class="table table-info table-hover">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Grupo</th>
            <th scope="col">Debut</th>
            <th scope="col">Cumpleaños</th>
            <th scope="col">Edad</th>
            <th scope="col">Estarura</th>           
            <th scope="col">Eliminar</th>
            <th scope="col">Editar</th>
            <th scope="col">Codigo QR</th>
          </tr>
        </thead>
        <tbody id="lista">
        </tbody>
      </table>
      <!--End table crud-->
    `
    const uid=user.uid;
  }else{
    container.innerHTML=`<img src="hii.png" class="uwu">
    <h1>Inicie sesion porfavor</h1>

    
   `
  }

})

const btnFon=document.querySelector("#BtnPhone");
btnFon.addEventListener('click', async(e)=>{
  e.preventDefault();
  try{
    const {value:tel}=await Swal.fire({
      title: 'Su numero de telefono',
      input: 'tel',
      inputLabel: 'Phone',
      inputValue: '+52',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar codigo de verificacion',
      showCancelButton: true,
    })
    window.recaptchaVerifier=new RecaptchaVerifier('recaptcha', {'size':'invisible'}, auth);
    const appVerifier=window.recaptchaVerifier;
    const confirmationResult=await signInWithPhoneNumber(auth, tel, appVerifier)
    console.log(confirmationResult);
    window.confirmationResult=confirmationResult;
    const {value:code}=await Swal.fire({
      title: 'Su codigo de verificacion porfavor',
      input: 'text',
      inputLabel: 'Codigo',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Verificar',
      showCancelButton: true,
    })

    const result=await window.confirmationResult.confirm(code)
    user=result.user;
    checarEstado(user)

  }catch(error){
    Swal.fire('No fue posible iniciar con numero de telefono en este momento');
  }
  });


const btnAn=document.querySelector("#BtnAn");
btnAn.addEventListener('click', async(e)=>{
e.preventDefault();
    try {
        const result=await signInAnonymously(auth);
        user=result.user;
        bootstrap.Modal.getInstance(document.getElementById('modLog')).hide();
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
           title: 'Ops...',
            text: 'No fue posible iniciar en este momento',
              })
    }

});





const btnGoogle=document.querySelector("#BtnCAG");
btnGoogle.addEventListener('click', async(e)=>{
e.preventDefault();
  const provider = new GoogleAuthProvider();
    try {
        const credencial=await signInWithPopup(auth, provider)
        user=credencial.user;
        checarEstado(user);
        console.log(credencial)
        Swal.fire({
            icon: 'success',
        title: 'Exito :D',
        text: 'Se inicio con exito',
        
    })
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
           title: 'Ops...',
            text: 'No fue posible iniciar con Google en estos momentos',
              })
    }

});

const checarEstado=(user=null)=>{
  console.log(user);
  if(user==null){
    document.querySelector("#iniciar").style.display="block";
    document.querySelector("#crear").style.display="block";
    document.querySelector("#BtnCAG").style.display="block";
    document.querySelector("#BtnPhone").style.display="block";
    document.querySelector("#cerrar").style.display="none";
  }
  else{
    document.querySelector("#iniciar").style.display="none";
    document.querySelector("#crear").style.display="none";
    document.querySelector("#BtnCAG").style.display="none";
    document.querySelector("#BtnPhone").style.display="none";
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
    text: 'Has iniciado sesion',
        
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
        text: 'Revisa tu email o contraseña',
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
    text: 'Has creado una cuenta',

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