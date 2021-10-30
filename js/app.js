
let adminitrarCitas=document.querySelector('#citas');
let nombreCliente=document.querySelector('#mascota');
let duenioCliente=document.querySelector('#propietario');
let telefonoCliente=document.querySelector('#telefono');
let fechaCliente=document.querySelector('#fecha');
let horaCliente=document.querySelector('#hora');
let sintomaCliente=document.querySelector('#sintomas');

const form=document.querySelector('#nueva-cita');
let estadoEdicion=false;

class UI{

    createErrors(type,message){
        let content=form.parentNode.parentNode;
        let error=document.createElement('p');
            error.textContent=message;

        switch(type){
            case 'error':
                error.className='alert alert-danger text-center fw-bold' 
                error.style.width="100%"
            break;
            case 'success':
                error.className='alert alert-info text-center fw-bold'
                error.style.width="100%"

            break;
            default:
                error.classList.remove('alert-dange' || 'alert-info')
            break; 
        }    
        content.insertBefore(error,document.querySelector('.agregar-cita'));

        setTimeout(()=> content.removeChild(error),3000);
    }

    createCitas({citas}){

        let div=document.createElement('div');

        citas.forEach(cita => {
            const{id,listo,nombre,duenio,telefono,fecha,hora,sintoma}=cita;
            div.className="card text-dark bg-light mb-3";
            div.style.maxWidth="30rem";
            div.id=id;
            div.innerHTML=
            `
            <div class="card-header d-flex justify-content-between align-items-center">${nombre}
                <a class="btn" onclick=eliminarCita(${id})>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
            </div>
                <div class="card-body">
                    <p class="card-title"><b>Propietario:</b>${duenio}</p>

                    <p class="card-text">
                        <b>Sintomas:</b> ${sintoma} 
                    </p> 

                    <p class="card-text">
                        <b>Telefono:</b>${telefono}
                    </p>
            </div>
            `    
            
            let footer=document.createElement('div');
                footer.className="card-footer";
                footer.textContent=`${fecha}  /  ${hora}`;

            let btnEditar=document.createElement('button');
                btnEditar.className="btn btn-info";
                btnEditar.style.float="right";
                btnEditar.textContent="EDITAR";
                btnEditar.onclick=()=>editarCita(cita);

            footer.appendChild(btnEditar);    
            div.appendChild(footer);

                
        if(listo === true)adminitrarCitas.appendChild(div);

        });  

        result={};
    }

    eliminar(id){
        adminitrarCitas.removeChild(document.getElementById(id))
    }

}

class cita{
    constructor(){
        this.citas=[]
    }
    registro(citas){
        this.citas=[...this.citas,citas];
    }

    eliminarCitaRegistro(id){
        this.citas=this.citas.filter( c => c.id !== id)
    }
}

let contentCitas=new cita
let ui=new UI

let result={
    listo:false,
}

const validar=e=>{
    e.preventDefault();

    form.querySelector('button').textContent="CREAR CITA";

    if(nombreCliente.value === ''  || duenioCliente.value === '' ||horaCliente.value === '' ||fechaCliente.value === '' ||sintomaCliente.value === ''){
        return ui.createErrors('error','TODOS LOS CAMPOS SON OBLIGATORIOS');
    }

    if(isNaN(nombreCliente.value)) result.nombre=nombreCliente.value
    else return ui.createErrors('error','EL NOMBRE INGRESADO ES INCORRECTO');

    if(isNaN(duenioCliente.value)) result.duenio=duenioCliente.value
    else return ui.createErrors('error','EL PROPIETARIO INGRESADO ES INCORRECTO');

    if(!isNaN(telefonoCliente.value)) result.telefono=telefonoCliente.value
    else return ui.createErrors('error','EL TELEFONO INGRESADO ES INCORRECTO');

    result.fecha=fechaCliente.value;
    result.hora=horaCliente.value;
    result.sintoma=sintomaCliente.value;
    result.listo=true;
    result.id=Date.now();
    
    contentCitas.registro(result)
    
    ui.createCitas(contentCitas)

    if(estadoEdicion){
        ui.createErrors('success','EL PACIENTE A SIDO ACTUALIZADO CORRECTAMENTE')
        estadoEdicion=false;
    }else{
        ui.createErrors('success','EL PACIENTE A SIDO GUARDADO CORRECTAMENTE')
    }

    form.reset()
}

const eliminarCita= id =>{
    contentCitas.eliminarCitaRegistro(id);
    ui.eliminar(id);
}

const editarCita= cita =>{
    estadoEdicion=true;

    const{nombre,duenio,telefono,fecha,hora,sintoma,id}=cita;

     nombreCliente.value=nombre
     duenioCliente.value=duenio
     telefonoCliente.value=telefono
     fechaCliente.value=fecha
     horaCliente.value=hora
     sintomaCliente.value=sintoma

     form.querySelector('button').textContent="EDITAR CITA";

     eliminarCita(id)
}

form.addEventListener('submit',validar);