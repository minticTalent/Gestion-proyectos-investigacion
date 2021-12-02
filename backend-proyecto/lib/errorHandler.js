'use strict'
// errorhandler ya funcionando para su uso
const herrorHandler = (error) => {
    console.log(error)
    throw new Error('fallo la operacion del servicio')
}

module.exports = herrorHandler