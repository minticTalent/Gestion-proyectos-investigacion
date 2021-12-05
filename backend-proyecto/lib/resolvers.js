'use strict' 
// Resolvers ya queda funcionando para su uso
const mutations = require('./mutations')
const queries = require('./queries')
const types = require('./types')
module.exports = {
    Query: queries,
    // Mutation: mutations,
    // Por si se utiliza los type descomentar
     ...types
}