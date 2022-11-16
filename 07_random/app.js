const cargarRazas=async()=>{
    const api=await fetch("https://dog.ceo/api/breeds/list/all");
    const response=await api.json();
    console.log(response.message);
    let comboRazas=document.querySelector("#razas");
    data=response.message;
    Object.keys(data).forEach(key=>{
        comboRazas.innerHTML+=`
        <option value="${key}">${key}</option>`

    });
}

const changePerritos=async (razas)=>{
    const api=await fetch(`https://dog.ceo/api/breed/${razas}/images/random/`);
    const response=await api.json();
    console.log(response.message);
    let divPerritos=document.querySelector("#perritos");
    data=response.message;
    divPerritos.innerHTML="";
    data.map(imgPerrito=>{
            divPerritos.innerHTML+=`<img src="${imgPerrito}"> `
        
    })
}