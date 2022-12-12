import {
    getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
 } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

const db=getFirestore();
const coleccion=collection(db,"idols");

let editStatus = false;
let id = "";

const onGetProductos = (callback) => onSnapshot(coleccion, callback);


window.addEventListener("DOMContentLoaded", async (e) => {
    
    onGetProductos((querySnapshot)=>{
        const divIdols=document.querySelector("#lista");
        divIdols.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const idol = doc.data();
            divIdols.innerHTML += `
                    
                <tr>
                    <td>${idol.name}</td>
                    <td>${idol.grupo}</td>
                    <td>${idol.debut}</td>
                    <td>${idol.cum}</td>
                    <td>${idol.edad}</td>
                    <td>${idol.estatura}</td>

                    <td><button class="btn btn-outline-danger btnDelete"  data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btn btn-outline-secondary btnEdit" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pen"></i></button></td>
                    <td><button class="btn btn-outline-dark btnQR" data-bs-toggle="modal" data-bs-target="#qrModal"  data-id="${doc.id}"><i class="bi bi-qr-code"></i></button></td>
                </tr>
                `;
        });

        const btnQR=document.querySelectorAll(".btnQR");
btnQR.forEach((btn)=>{
    btn.addEventListener("click", async (e)=>{
      try{
      id=btn.dataset.id;
      console.log(id);
      const data=await getDoc(doc(db, "idols", id));
      const idol=data.data();
      const contQR=document.getElementById('contQR');
      contQR.innerHTML=""
      const QR=new QRCode(contQR);
      QR.makeCode(id);
      } catch (error){  
        console.log(error);
      }
    });
  });
 

        const btnDelete = document.querySelectorAll(".btnDelete");
        //console.log(btnsDelete);
        btnDelete.forEach((btn,idx) =>
            btn.addEventListener("click", () => {
                id=btn.dataset.id;
                console.log(btn.dataset.id);
                Swal.fire({
                    title: 'Seguro que quieres borrar este registro?',
                    showDenyButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                }).then(async(result) => {
                    try {
                        if (result.isConfirmed) {
                            await deleteDoc(doc(db, "idols", id));
                            Swal.fire("Registro eliminado");
                        }                         
                    } catch (error) {
                        Swal.fire("Error al eliminar");
                    }
                })       
            })
        );

        const btnEdit = document.querySelectorAll(".btnEdit");
        btnEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    id=btn.dataset.id;
                    console.log(id);
                    const data= await getDoc(doc(db, "idols", id));
                    const idol = data.data();
                    document.querySelector("#ename").value=idol.name;
                    document.querySelector("#egrupo").value=idol.grupo;
                    document.querySelector("#edebut").value=idol.debut;
                    document.querySelector("#ecum").value=idol.cum;
                    document.querySelector("#eedad").value=idol.edad;
                    document.querySelector("#eestatura").value=idol.estatura;

                    editStatus = true;
                    id = data.id;
                } catch (error) {
                    console.log(error);
                }
            });
        });

    });
    
});

const btnAdd=document.querySelector("#btnAdd");
btnAdd.addEventListener("click",()=>{
    const name=document.querySelector("#name").value;
    const grupo=document.querySelector("#grupo").value;
    const debut=document.querySelector("#debut").value;
    const cum=document.querySelector("#cum").value;
    const edad=document.querySelector("#edad").value;
    const estatura=document.querySelector("#estatura").value;

    if(name=="" || grupo=="" || debut=="" || cum=="" || edad=="" || estatura=="" ){
        Swal.fire("falta llenar Campos");
        return;
    }

    const idol={ name, grupo, debut, cum, edad, estatura};

    if (!editStatus) {
        addDoc(coleccion, idol);        
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    } 

    Swal.fire({
        icon: 'success',
        title: 'EXITO :D',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#formAddMod").reset();
});


const btnSave=document.querySelector("#btnSave");
btnSave.addEventListener("click",()=>{
    const name=document.querySelector("#ename").value;
    const grupo=document.querySelector("#egrupo").value;
    const debut=document.querySelector("#edebut").value;
    const cum=document.querySelector("#ecum").value;
    const edad=document.querySelector("#eedad").value;
    const estatura=document.querySelector("#eestatura").value;


    if(name=="" || grupo=="" || debut=="" || cum=="" || edad=="" || estatura==""){
        Swal.fire("Fil all camps");
        return;
    }

    const idol={ name, grupo, debut, cum, edad, estatura};

    if (editStatus) {
        updateDoc(doc(db, "idols", id), idol);
        editStatus = false;
        id = "";
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }

    Swal.fire({
        icon: 'success',
        title: 'Exito :D',
        text: 'Se ha guardado tu registro'
    })
    document.querySelector("#formEdit").reset();
});


