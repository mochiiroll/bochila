const cargarPosts=async()=>{
  let url="https://jsonplaceholder.typicode.com/posts";
  const api=await fetch (url);
  const data=await api.json();
  console.log(data);
  tabla=document.querySelector("#lista");
  data.map(item=>{
      tabla.innerHTML+=`
      <tr>
      <th scope="row">${item.id}</th>
      <td>${item.title}</td>
      <td>${item.body}</td>
      <td><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal" onclick="cargarPost(${item.id})"> <i class="bi bi-pencil-square"></i> Editar</button></td>
      <td><button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="eliminarPost(${item.id})"><i class="bi bi-backspace m-2"></i>Eliminar</button></td>
      </tr>`;
  })
}

const cargarPost=async(id)=>{
const api= await fetch('https://jsonplaceholder.typicode.com/posts/'+id);
  const respuesta=await api.json();
  console.log(respuesta)
  document.querySelector("#etitle").value=respuesta.id;
  document.querySelector("#ebody").value=respuesta.body;
  document.querySelector("#eid").value=respuesta.id;
  document.querySelector("#euserid").value=respuesta.userId;
}

const guardarPost=async()=>{
let title=document.querySelector("#etitle").value;
let body=document.querySelector("#ebody").value;
let id=document.querySelector("#eid").value;
let userId=document.querySelector("#euserid").value;
const post={
  title:title,
  body:body,
  id:id,
  userId:userId
}
const api=await fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
  method: 'PUT',
  body: JSON.stringify(post),
  headers: {
      'Content-type': 'application/json; charset=UTF-8',
  },
})
const respuesta=await api.json();
console.log(respuesta)
if(respuesta!=null){
Swal.fire({
    icon: 'success',
    title: 'Editado',
    text: 'Se a Editado con exito!',

  })
}else{
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Algo salio mal!',

  })
}
}


const eliminarPost=(id)=>{
document.querySelector("#deleteid").value=id;
}
const deletepost=async ()=>{
const id=document.querySelector("#deleteid").value;
const api=await fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
    method: 'DELETE',
})
const respuesta=await api.json();
console.log(respuesta)
if(respuesta!=null){
  Swal.fire({
      icon: 'success',
      title: 'Editado',
      text: 'Se a Editado con exito!',
  
    })
}else{
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal!',
  
    })
}
}

const addpost=async ()=>{
  //Objeto js-->
let titulo=document.querySelector("#titulo").value;
let body=document.querySelector("#body").value;
const post={titulo:titulo,body:body,userId:1};

  
  const api=await fetch('https://jsonplaceholder.typicode.com/posts', {
method: 'POST',
body: JSON.stringify(post),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
},
});
const respuesta=await api.json();
console.log(respuesta)

tabla=document.querySelector("#lista");
tr=document.createElement("tr");
tr.innerHTML=`
<th scope="row">${respuesta.id}</th>
      <td>${respuesta.titulo}</td>
      <td>${respuesta.body}</td>
      <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal"> <i class="bi bi-pen"></i> Editar</button></td>
      <td><button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-backspace m-2"></i>Eliminar</button></td>
      `
tabla.appendChild(tr);
if(respuesta!=null){
  Swal.fire({
      icon: 'SATISFACTORIO',
      title: 'nono...',
      text: 'ALGO ANDA MAL!',
  
    })
}else{
  Swal.fire({
      icon: 'ERROR',
      title: 'nono...',
      text: 'ALGO ANDA MAL!',
  
    })
}


}