const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  
  nombreEmpleado: {
    type: String,
    required: true
  },
  hora_apertura: {
    type: String,
    required: true
  },
  hora_cierre: {
    type: String,
    required: true
  },
  dias_laborales: {
    type: [String],
    required: true
  },
  fechaDeRegistro: {
    type: Date,
    required: true
  
  }
});

const Agenda = mongoose.model('Agenda', agendaSchema);

module.exports = Agenda;
