const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{agendaGet,agendaPost,agendaPut,agendaDelete}=require('../controllers/agenda')
route.get('/', agendaGet)
route.post('/',agendaPost )
route.put('/',agendaPut )
route.delete('/',agendaDelete )



module.exports = route
