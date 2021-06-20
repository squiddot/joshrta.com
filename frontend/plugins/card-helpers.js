const countRegEx = (str, re) => {
  return ((str || '').match(re) || []).length
}

const supReg = str => {
  if (str.match(/®(?!<\/sup>)/)) {
    return str.replace(/®(?!<\/sup>)/g, '<sup>$&</sup>')
  }
  return str
}

const wordLimit = (str, length) => {
  if (typeof str === 'string') {
    str = str.trim()
    str = str
      .replace(/<br\s?\/?>/gi, ' ') // Clear out brs
      .replace(/\s+/gi, ' ') // Combine Spaces
      .replace(/>\s/gi, '>') // Remove spaces after >
      .replace(/\s<\//gi, '</') // Remove spaces before <
    const strParts = str.split(' ')
    strParts.splice(length)
    str = strParts.join(' ')
    const openPs = countRegEx(str, /<p>/g)
    const closePs = countRegEx(str, /<\/p>/g)
    if (openPs > closePs) {
      str += '...</p>'
    } else if (!str.endsWith('</p>')) {
      str += '...'
    }
  }

  return str
}

const dateFormat = dateString => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return `${months[month]} ${day}, ${year}`
}

const blockToCard = block => {
  const cardData = {
    id: Number(block.id),
    title: block.itemHeadline,
    link: block.itemLink.url,
    linkText: block.itemLink.text,
    linkTarget: block.itemLink.target,
  }
  if (block.image.length > 0) {
    cardData.image = block.image[0]
  }
  return cardData
}

const recipeToCard = recipe => {
  const intro = wordLimit(recipe.intro, 30)

  const cardData = {
    id: Number(recipe.id),
    title: recipe.title,
    intro,
    link: recipe.uri,
    linkText: 'View recipe',
    brand: recipe.brand ? recipe.brand[0] : null,
    showFeatured: recipe.showFeatured,
  }
  if (recipe.media.length > 0) {
    cardData.image = recipe.media[0]
  }
  return cardData
}

const productToCard = product => {
  const cardData = {
    id: Number(product.id),
    title: product.title,
    intro: product.intro,
    link: product.itemUrl || product.uri,
    linkText: 'View product',
    brand: product.brand ? product.brand[0] : null,
    showFeatured: product.showFeatured,
  }
  if (product.media.length > 0) {
    cardData.image = product.media[0]
  }
  return cardData
}

const articleToCard = article => {
  const cardData = {
    id: Number(article.id),
    meta: dateFormat(article.postDate),
    title: article.title,
    excerpt: `<p>${article.excerpt}</p>`,
    link: article.uri,
    linkText: 'Read article',
    showFeatured: article.showFeatured,
  }
  if (article.image.length > 0) {
    cardData.image = article.image[0]
  }
  return cardData
}

const recipeCards = (recipes, preventFeatured = false) => {
  if (recipes) {
    recipes = recipes.map(recipeToCard)
    // In desktop there is 3 columns
    let currentColumn = 1
    return recipes.map(recipe => {
      // If the current column is 3 we can't expand to become wide.
      recipe.featured = !preventFeatured && currentColumn % 3 !== 0 ? recipe.showFeatured : false
      // Add 1 to column unless the current card became featured then add 2
      currentColumn += recipe.featured ? 2 : 1
      return recipe
    })
  } else {
    return []
  }
}

const productCards = (products, preventFeatured = false) => {
  if (products) {
    products = products.map(productToCard)
    // In desktop there is 3 columns
    let currentColumn = 1
    return products.map(product => {
      // If the current column is 3 we can't expand to become wide.
      product.featured = !preventFeatured && currentColumn % 3 !== 0 ? product.showFeatured : false
      // Add 1 to column unless the current card became featured then add 2
      currentColumn += product.featured ? 2 : 1
      return product
    })
  } else {
    return []
  }
}

const articleCards = (articles, preventFeatured = false) => {
  if (articles) {
    articles = articles.map(articleToCard)
    // In desktop there is 3 columns
    let currentColumn = 1
    return articles.map(article => {
      // If the current column is 3 we can't expand to become wide.
      article.featured = !preventFeatured && currentColumn % 3 !== 0 ? article.showFeatured : false
      // Add 1 to column unless the current card became featured then add 2
      currentColumn += article.featured ? 2 : 1
      return article
    })
  } else {
    return []
  }
}

const cards = cards => {
  return cards
    .map(card => {
      switch (card.typeHandle) {
        case 'recipeCard':
          if (card.recipes.length) {
            return recipeToCard(card.recipes[0])
          }
          break
        case 'articleCard':
          if (card.articles.length) {
            return articleToCard(card.articles[0])
          }
          break
        case 'card':
          return blockToCard(card)
        // default:
        //   console.log('Missing Card Processor:', card)
      }
      return null
    })
    .filter(card => card)
}

const getFirstIndex = (_array, _default) => {
  if (_array?.length) {
    return _array[0]
  } else {
    return _default
  }
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default (context, inject) => {
  inject('supReg', supReg)
  inject('wordLimit', wordLimit)
  inject('recipeCards', recipeCards)
  inject('productCards', productCards)
  inject('articleCards', articleCards)
  inject('cards', cards)
  inject('getFirstIndex', getFirstIndex)
  inject('dateFormat', dateFormat)
}
