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
const coleccion=collection(db,"productos");

let editStatus = false;
let id = "";

const onGetProductos = (callback) => onSnapshot(coleccion, callback);


window.addEventListener("DOMContentLoaded", async (e) => {
    
    onGetProductos((querySnapshot)=>{
        const divProductos=document.querySelector("#lista");
        divProductos.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            divProductos.innerHTML += `
                    
                <tr>
                    <td>n${producto.name}</td>
                    <td>p${producto.price}</td>
                    <td>s${producto.stock}</td>
                    <td>d${producto.descripcion}</td>
                    <td><button class="btn btn-danger btnDelete"  data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btn btn-primary btnEdit" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#qrModal"   data-id="${doc.id}"><i class="bi bi-qr-code"></i></button></td>
                </tr>
                `;
        });
 

        const btnDelete = document.querySelectorAll(".btnDelete");
        //console.log(btnsDelete);
        btnDelete.forEach((btn,idx) =>
            btn.addEventListener("click", () => {
                id=btn.dataset.id;
                console.log(btn.dataset.id);
                Swal.fire({
                    title: 'Eliminar este regitro?',
                    showDenyButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                }).then(async(result) => {
                    try {
                        if (result.isConfirmed) {
                            await deleteDoc(doc(db, "productos", id));
                            Swal.fire("Registro eliminado");
                        }                         
                    } catch (error) {
                        Swal.fire("ERROR DELETE FILED");
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
                    const data= await getDoc(doc(db, "productos", id));
                    const producto = data.data();
                    document.querySelector("#ename").value=producto.name;
                    document.querySelector("#eprice").value=producto.price;
                    document.querySelector("#estock").value=producto.stock;
                    document.querySelector("#edescripcion").value=producto.descripcion;
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
    const price=document.querySelector("#price").value;
    const stock=document.querySelector("#stock").value;
    const descripcion=document.querySelector("#descripcion").value;

    if(name=="" || price=="" || stock=="" || descripcion==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const producto={ name, price, stock, descripcion};

    if (!editStatus) {
        addDoc(coleccion, producto);        
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    } 

    Swal.fire({
        icon: 'success',
        title: 'EXITO :D',
        text: 'Se guardo correctamente!'
    })
    document.querySelector("#addModal").reset();
});


const btnSave=document.querySelector("#btnSave");
btnSave.addEventListener("click",()=>{
    const name=document.querySelector("#ename").value;
    const price=document.querySelector("#eprice").value;
    const stock=document.querySelector("#estock").value;
    const descripcion=document.querySelector("#edescripcion").value;

    if(name=="" || price=="" || stock=="" || descripcion==""){
        Swal.fire("Fil all camps");
        return;
    }

    const producto={ name, price, stock, descripcion};

    if (editStatus) {
        updateDoc(doc(db, "productos", id), producto);
        editStatus = false;
        id = "";
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }

    Swal.fire({
        icon: 'success',
        title: 'Exito :D',
        text: 'Registro guardado'
    })
    document.querySelector("#editModal").reset();
});




