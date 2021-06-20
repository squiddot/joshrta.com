export default async (context, inject) => {
  /**
   * Processes data from seomatic so that it is ready to assign to
   * Nuxt's head.
   *
   * @param seomaticData
   * @return {{__dangerouslyDisableSanitizers: [string], script: *[]}}
   */
  const processSeomaticData = (seomaticData, lang = 'en') => {
    context.app.$timeStart('process Seomatic Data')
    delete seomaticData.__typename

    // ----- Start code based on
    // https://github.com/ben-rogerson/nuxt-seomatic-meta/blob/master/lib/plugin.js
    // -----
    // Convert the graphql JSON data to an object so we can work with it

    const {
      metaTitleContainer: {
        title: { title },
      },
      metaTagContainer,
      metaLinkContainer,
      metaScriptContainer,
      metaJsonLdContainer,
    } = Object.entries(seomaticData).reduce((acc, [key, value]) => {
      acc[key] = JSON.parse(value)
      return acc
    }, {})

    // Flatten metaTagContainer values into string
    const meta = metaTagContainer ? Object.values(metaTagContainer).reduce((flat, next) => flat.concat(next), []) : null

    // Flatten metaLinkContainer values into string
    const link = metaLinkContainer
      ? Object.values(metaLinkContainer).reduce((flat, next) => flat.concat(next), [])
      : null

    // Convert script data to <script>..</script>
    const metaScripts = metaScriptContainer
      ? Object.values(metaScriptContainer).map(({ script }) => ({
          innerHTML: script,
        }))
      : []

    // Convert JsonLd to <script type="application/ld+json">...</script>
    const jsonLd = metaJsonLdContainer
      ? Object.entries(metaJsonLdContainer).map(value => ({
          type: 'application/ld+json',
          innerHTML: JSON.stringify(value),
        }))
      : []

    // Combine processed script data
    const script = [...metaScripts, ...jsonLd]

    seomaticData = {
      ...(title && { title }),
      ...(meta && { meta }),
      ...(link && { link }),
      script,
      __dangerouslyDisableSanitizers: ['script'],
    }
    // ----- End code based on
    // https://github.com/ben-rogerson/nuxt-seomatic-meta/blob/master/lib/plugin.js
    // -----

    // additional processing
    let hasDescription = false
    let ogDescription = false
    let ogSiteName = false
    for (const meta of seomaticData.meta) {
      meta.hid = meta.property
      if (meta.property === 'description') {
        hasDescription = true
      }
      if (meta.property === 'og:description') {
        ogDescription = {
          hid: 'description',
          property: 'description',
          content: meta.content,
        }
      }
      if (meta.property === 'og:site_name') {
        ogSiteName = {
          hid: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: meta.content,
        }
      }
    }
    if (!hasDescription && ogDescription) {
      seomaticData.meta.push(ogDescription)
    }
    if (ogSiteName) {
      seomaticData.meta.push(ogSiteName)
    }
    context.app.$timeEnd('process Seomatic Data', '[SEO] Process SEO Data')
    return { htmlAttrs: { lang }, ...seomaticData }
  }

  /**
   * Parse form.
   *
   * @param rawLayout
   * @return {{pages: [], data: {}, hash: *}}
   */
  const parseForm = rawLayout => {
    const layoutData = rawLayout.composer.layout
    const propertiesData = rawLayout.composer.properties
    const layout = {
      hash: rawLayout.hash,
      data: {},
      pages: [],
    }
    for (const pageData of layoutData) {
      const page = {
        rows: [],
      }
      for (const rowData of pageData) {
        const row = {
          columns: [],
        }
        for (const fieldHandle of rowData.columns) {
          const properties = propertiesData[fieldHandle]
          row.columns.push(properties)
          if (properties.options) {
            for (const option of properties.options) {
              option.id = option.value
            }
          }
          switch (properties.type) {
            case 'checkbox_group':
              layout.data[properties.handle] = properties.values
              break
            case 'checkbox':
              layout.data[properties.handle] = properties.checked
              break
            default:
              layout.data[properties.handle] = properties.value
          }
        }
        page.rows.push(row)
      }
      layout.pages.push(page)
    }
    // console.log(layout)
    return layout
  }

  const getEmbedJsonData = async url => {
    url = url.replace(context.env.CLOUDFRONT_URL, `/${context.env.CLOUDFRONT_ID}/`)
    return await context.$axios.$get(encodeURI(url))
  }

  inject('processSeomaticData', processSeomaticData)
  inject('parseForm', parseForm)
  const resp = await context.app.$axios.$get('/get-csrf')
  inject('csrf', resp)
  inject('getEmbedJsonData', getEmbedJsonData)
}
