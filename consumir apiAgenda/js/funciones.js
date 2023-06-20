const url = 'http://localhost:8077/api/agenda';

const listarDatos = async () => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaAgenda = data.agendas;
      listaAgenda.map(function (agenda) {
        respuesta += `<tr><td>${agenda.nombreEmpleado}</td>` +
          `<td>${agenda.dias_laborales}</td>` +
          `<td>${agenda.hora_apertura}</td>` +
          `<td>${agenda.hora_cierre}</td>` +
          `<td>${agenda.fechaDeRegistro}</td>` +
          `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(agenda)})'>Editar</a> 
            <a class="waves-effect waves-light btn modal-danger red" onclick='eliminar(${JSON.stringify(agenda)})'>Eliminar</a></td>` +
          `</tr>`;
        body.innerHTML = respuesta;
      });
    });
};

const validarHora = (hora) => {
  // Expresión regular para el formato de la hora (HH:MM)
  const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regexHora.test(hora);
};



const validarFecha = (fecha) => {
  // Eliminamos las restricciones de formato, siempre retorna true
  return true;
};

const validarNombreEmpleado = (nombre) => {
  // Expresión regular para el nombre del empleado (solo letras y espacios, longitud de 2 a 50 caracteres)
  const regexNombre = /^[A-Za-z\s]{2,50}$/;
  return regexNombre.test(nombre);
};

const registrar = async () => {
  let _nombreEmpleado = document.getElementById('nombreEmpleado').value;
  let _hora_apertura = document.getElementById('hora_apertura').value;
  let _hora_cierre = document.getElementById('hora_cierre').value;
  let _dias_laborales = document.getElementById('dias_laborales').value;
  let _fechaDeRegistro = document.getElementById('fechaDeRegistro').value;

  // Validar los campos antes de registrar la agenda
  if (!validarNombreEmpleado(_nombreEmpleado)) {
    Swal.fire(
      'Error en el nombre del empleado.',
      'El nombre debe contener solo letras y espacios, y tener una longitud de 2 a 50 caracteres.',
      'error'
    );
    return;
  }

  if (!validarHora(_hora_apertura)) {
    Swal.fire(
      'Error en la hora de apertura.',
      'El formato de la hora de apertura debe ser HH:MM.',
      'error'
    );
    return;
  }

  if (!validarHora(_hora_cierre)) {
    Swal.fire(
      'Error en la hora de cierre.',
      'El formato de la hora de cierre debe ser HH:MM.',
      'error'
    );
    return;
  }

  if (!validarFecha(_fechaDeRegistro)) {
    Swal.fire(
      'Error en la fecha de registro.',
      'El formato de la fecha de registro debe ser YYYY-MM-DD.',
      'error'
    );
    return;
  }

  let Agenda = {
    nombreEmpleado: _nombreEmpleado,
    hora_apertura: _hora_apertura,
    hora_cierre: _hora_cierre,
    dias_laborales: _dias_laborales,
    fechaDeRegistro: _fechaDeRegistro
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(Agenda),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const json = await response.json();

    if (json.msg) {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    }
  } catch (error) {
    Swal.fire(
      'Error al insertar.',
      '',
      'error'
    );
    console.log(error);
  }
};

const eliminar = (nombreEmpleado) => {
  if (confirm('¿Está seguro que desea realizar la eliminación?')) {
    let agenda = {
      nombreEmpleado: nombreEmpleado.nombreEmpleado
    };

    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(agenda),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((resp) => resp.json())
      .then(json => {
        alert(json.msg);
      });
  }
};



const editar = (agenda) => {
  const url = 'http://localhost:8077/api/agenda';

  const nombreEmpleadoInput = document.getElementById('nombreEmpleado');
  const hora_aperturaInput = document.getElementById('hora_apertura');
  const hora_cierreInput = document.getElementById('hora_cierre');
  const dias_laboralesInput = document.getElementById('dias_laborales');
  const fechaDeRegistroInput = document.getElementById('fechaDeRegistro');

  if (agenda) {
    nombreEmpleadoInput.value = agenda.nombreEmpleado || '';
    hora_aperturaInput.value = agenda.hora_apertura || '';
    hora_cierreInput.value = agenda.hora_cierre || '';
    dias_laboralesInput.value = agenda.dias_laborales || '';
    fechaDeRegistroInput.value = agenda.fechaDeRegistro || '';

    // Mostrar una alerta de éxito al editar la agenda
    Swal.fire(
      'Agenda editada correctamente',
      '',
      'success'
    );
  } else {
    // Mensaje de error en caso de que no se pueda realizar la edición
    console.log('¡Hubo un problema al editar la agenda!');
  }
};
const actualizar = async () => {
  let _nombreEmpleado = document.getElementById('nombreEmpleado').value;
  let _hora_apertura = document.getElementById('hora_apertura').value;
  let _hora_cierre = document.getElementById('hora_cierre').value;
  let _dias_laborales = document.getElementById('dias_laborales').value;
  let _fechaDeRegistro = document.getElementById('fechaDeRegistro').value;

  // Validar los campos antes de actualizar la agenda
  if (!validarNombreEmpleado(_nombreEmpleado)) {
    Swal.fire(
      'Error en el nombre del empleado.',
      'El nombre debe contener solo letras y espacios, y tener una longitud de 2 a 50 caracteres.',
      'error'
    );
    return;
  }

  if (!validarHora(_hora_apertura)) {
    Swal.fire(
      'Error en la hora de apertura.',
      'El formato de la hora de apertura debe ser HH:MM.',
      'error'
    );
    return;
  }

  if (!validarHora(_hora_cierre)) {
    Swal.fire(
      'Error en la hora de cierre.',
      'El formato de la hora de cierre debe ser HH:MM.',
      'error'
    );
    return;
  }

  if (!validarFecha(_fechaDeRegistro)) {
    Swal.fire(
      'Error en la fecha de registro.',
      'El formato de la fecha de registro debe ser YYYY-MM-DD.',
      'error'
    );
    return;
  }

  let Agenda = {
    nombreEmpleado: _nombreEmpleado,
    hora_apertura: _hora_apertura,
    hora_cierre: _hora_cierre,
    dias_laborales: _dias_laborales,
    fechaDeRegistro: _fechaDeRegistro
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(Agenda),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const json = await response.json();

    if (json.msg) {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    }
  } catch (error) {
    Swal.fire(
      'Error al actualizar.',
      '',
      'error'
    );
    console.log(error);
  }
};





if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar')
  .addEventListener('click', () => {registrar()});
}

if (document.querySelector('#btnEditar')) {
  document.querySelector('#btnEditar').addEventListener('click', editar);
}


if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}


