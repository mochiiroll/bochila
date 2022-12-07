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
            <td><button class="btn btn-danger" id="btnAdd" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-check"></i>Add Register</button></td>
                    
                <tr>
                    <td>n${producto.name}</td>
                    <td>p${producto.precio}</td>
                    <td>s${producto.stock}</td>
                    <td>d${producto.descripcion}</td>
                    <td><button class="btn btn-danger btnDelete"  data-id="${doc.id}"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btn btn-primary btnEdit" data-bs-toggle="modal" data-bs-target="#editModal"   data-id="${doc.id}"><i class="bi bi-pencil"></i></button></td>
                </tr>
                
                <!--edit modal-->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="bi bi-pencil-square"></i> Editar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Nombre:</label>
            <input type="text" class="form-control" id="ename">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Grupo:</label>
            <input type="text" class="form-control" id="eprice">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Dedut:</label>
            <input type="text" class="form-control" id="estock">
          </div>
          
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Fecha de cumpleaños:</label>
            <input type="text" class="form-control" id="edescription">
            <input type="hidden" name="id">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="bi bi-trash m-2"></i>Cancelar</button>
        <button type="button" class="btn btn-success" id="btnSave"><i class="bi bi-save m-2"></i>Guardar cambios</button>
      </div>
    </div>
  </div>
</div>
<!--add modal-->
<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="bi bi-arrow-right-square-fill m-2"></i>Agregar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Nombre:</label>
            <input type="text" class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Grupo:</label>
            <input type="text" class="form-control" id="price">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Debut:</label>
            <input type="text" class="form-control" id="stock">
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Fecha de cumpleaños:</label>
            <input type="text" class="form-control" id="description">
            <input type="hidden" name="id">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="bi bi-trash m-2"></i>Cancelar</button>
        <button type="button" class="btn btn-success" id="btnAdd"> <i class="bi bi-save m-2" ></i>Guardar cambios</button>
      </div>
    </div>
  </div>
</div>
                `;
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
                    const alumno = data.data();
                    document.querySelector("#ename").value=producto.name;
                    document.querySelector("#eprecio").value=producto.precio;
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
    const precio=document.querySelector("#precio").value;
    const stock=document.querySelector("#stock").value;
    const descripcion=document.querySelector("#descripcion").value;

    if(name=="" || precio=="" || stock=="" || descripcion==""){
        Swal.fire("falta llenar Campos");
        return;
    }

    const producto={ name, precio, stock, descripcion};

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
    const precio=document.querySelector("#eprecio").value;
    const stock=document.querySelector("#estock").value;
    const descripcion=document.querySelector("#edescripcion").value;

    if(name=="" || precio=="" || stock=="" || descripcion==""){
        Swal.fire("Fil all camps");
        return;
    }

    const alumno={ name, precio, stock, descripcion};

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
