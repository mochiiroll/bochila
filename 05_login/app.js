import {app} from './firebase.js'
import {getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
let user=null;

const auth =getAuth(app);

onAuthStateChanged(auth, (user) =>{
const container=document.querySelector("#container");
checarEstado(user); 
if(user){
    container.innerHTML=`<h1>BIENVENIDO: ${user.email}</h1>
    `
    const uid= ujser. uid;
} else{
    container.innerHTML=`<h1>NO HAY USUARIO</h1>`
}
})


const btnGoogle=document.querySelector("#btnGoogle");
btnGoogle.addEventListener('click', async(e)=>{
    e.preventDefault();
      const provider = new GoogleAuthProvider();
      try{
        const credentials = await signInWithEmailAndPassword(auth, provider)
        user=credentials.user;
        const modalInstance = bootstrap.Modal.getInstance(btnGoogle.closest(`.modal`));
        modalInstance.hide();
        checarEstado(user)
      }catch(error){
        console.log(error);
      }
});

const checarEstado=(user=null)=>{
    console.log(user);
    if (user==null){
        document.querySelector("#iniciar").style.display="block";
        document.querySelector("#crear").style.display="block";
        document.querySelector("#btnCerrarSesion").style.display="none";
    }else{
        document.querySelector("#iniciar").style.display="none";
        document.querySelector("#crear").style.display="none";
        document.querySelector("#btnCerrarSesion").style.display="block";
    }
    
}

const btnCerrarSesion=document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener('click', async(e)=>{
    e.preventDefault();
    try{
        await signOut(auth)
        checarEstado()
    }catch (error){
        console.log(error)
    }
});

const btnIniciarSesion=document.querySelector("#btnInciarSesion");
btnIniciarSesion.addEventListener('click', async(e)=>{
    e.preventDefault();
    const email=document.querySelector("#iniciarEmail");
    const password=document.querySelector("#iniciarPassword");
    try{
        const res= await signInWithEmailAndPassword(auth, email.value, password.value)
        user=res.user;
        Swal.fire('BIENVENIDES');
        var myModalEl = document.getElementById('iniciarModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    }catch (error){
        Swal.fire('USUARIO Y/O CONTRASEÑA INCORRECTA');
    }
});


const btnCrearCuenta=document.querySelector("#btnCrearCuenta");
btnCrearCuenta.addEventListener('click', async(e)=>{
    e.preventDefault();
    const email=document.querySelector("#crearEmail");
    const password=document.querySelector("#crearPassword");
    //console.log(email.value,password.value);
    var myModalEl = document.getElementById('crearModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    try{
        const respuesta=await createUserWithEmailAndPassword(auth, email.value, password.value)
        //console.log(respuesta.user);
        Swal.fire({
            icon: 'success',
            title: 'EXITE',
            text: 'La cuenta se  registro correctamente!'
        })
        email.value='';
        password.value=''
        modal.hide();
    } catch{
        console.log(error.code);
        const code=error.code;
        if(code=='auth/ivalid-email'){
            Swal.fire('Correo Electronico invalido')
        }
        if(code=='auth/weak-password'){
            Swal.fire('Password Invalido')
        }
        if(code=='auth/email-already-in-use'){
            Swal.fire('Correo Electronico ya esta en uso!!!')
        }    
    }
});
checarEstado();
