// lib/sanity.js - Configura��o do cliente Sanity
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false, // Para dados em tempo real
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source)
}
