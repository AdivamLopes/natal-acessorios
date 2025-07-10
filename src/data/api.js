// src/data/api.js

import { client } from '@/lib/sanity'
import groq from 'groq'

export const api = {
    produtos: {
        listar: async () => {
            const query = groq`*[_type == "produto"]{
        _id,
        nome,
        preco,
        "imagem": imagem.asset->_ref,
        "categoria": categoria->nome,
        estoque
      }`
            return await client.fetch(query)
        },

        buscar: async (id) => {
            const query = groq`*[_type == "produto" && _id == $id][0]{
        _id,
        nome,
        preco,
        "imagem": imagem.asset->_ref,
        "categoria": categoria->nome,
        estoque
      }`
            return await client.fetch(query, { id })
        },
    },

    categorias: {
        listar: async () => {
            const query = groq`*[_type == "categoria"]{
        _id,
        nome
      }`
            return await client.fetch(query)
        },
    },
}