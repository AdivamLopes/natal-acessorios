export const PRODUCTS_QUERY = `
  *[_type == "product" && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    "images": images[].asset._ref,
    price,
    salePrice,
    description,
    "category": category->name,
    featured,
    specifications,
    inStock,
    stockQuantity
  }
`

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true && inStock == true] | order(_createdAt desc) [0...8] {
    _id,
    name,
    slug,
    "images": images[].asset._ref,
    price,
    salePrice,
    description,
    "category": category->name,
    specifications
  }
`

export const SINGLE_PRODUCT_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "images": images[]{"url": asset->url, "alt": alt},
    price,
    salePrice,
    description,
    "category": category->{name, slug},
    specifications,
    inStock,
    stockQuantity,
    tags,
    careInstructions,
    seoTitle,
    seoDescription
  }
`

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    "image": image.asset->url,
    order
  }
`