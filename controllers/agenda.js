// Importar paquetes requeridos de Node.js
const { response } = require('express');
const mongoose = require('mongoose');



// Importar modelos
const Agenda= require('../models/agenda');

// Consultar 
const agendaGet = async (req, res = response) => {
    const {nombreEmpleado} = req.query;

    // Buscar las agendas 
    const agendas= await Agenda.find();
    
    res.json({
        agendas
    });
}

// Insertar agenda
const agendaPost = async (req, res = response) => {
  const body = req.body;
  console.log(body);
  let mensaje = '';

  try {
    const agenda = new Agenda(body);
    await agenda.save();
    mensaje = 'La inserción se realizó exitosamente.';
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.error(Object.values(error.errors).map(val => val.message));
      mensaje = Object.values(error.errors).map(val => val.message);
    } else {
      console.error(error);
      mensaje = 'Ocurrió un error durante la inserción.';
    }
  }

  res.json({
    msg: mensaje
  });
};




// Modificar agenda
const agendaPut = async (req, res = response) => {
    // Capturar atributos o parámetros
    const { nombreEmpleado,hora_apertura,hora_cierre,dias_laborales,fechaDeregistro} = req.body;
    let mensaje = '';
  
    try {
      // Realizar la modificación
      const agenda = await  Agenda.findOneAndUpdate(
        { nombreEmpleado:nombreEmpleado},
        {
           nombreEmpleado,hora_apertura,hora_cierre,dias_laborales,fechaDeregistro }
      );
  
      mensaje = 'La modificación se efectuó correctamente.';
    } catch (error) {
      mensaje= 'Se presentaron problemas en la modificación.';
    }
  
    res.json({
      msg: mensaje
    });
    //alert (mensaje)
  };

// Eliminar agenda
const agendaDelete = async (req, res = response) => {
    const { nombreEmpleado } = req.body;
    let mensaje = '';

    try {
        await Agenda.deleteOne({ nombreEmpleado:nombreEmpleado });
        mensaje = 'La eliminación se efectuó correctamente.';
    } catch (error) {
        mensaje = 'Se presentaron problemas en la eliminación.';
    }

    res.json({
        msg: mensaje
    });
}

module.exports = {
    agendaGet,
    agendaPost,
    agendaPut,
    agendaDelete

 
};
