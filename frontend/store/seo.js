// import { gqlSEO } from '~/gql/seo.graphql'
//
// export const state = () => ({
//   meta: {},
//   socials: [],
// })
//
// const socials = [
//   {
//     find: 'instagram',
//     icon: 'instagram',
//   },
//   {
//     find: 'pinterest',
//     icon: 'pinterest',
//   },
//   {
//     find: 'facebook',
//     icon: 'facebook',
//   },
//   {
//     find: 'twitter',
//     icon: 'twitter',
//   },
//   {
//     find: 'youtube',
//     icon: 'youtube',
//   },
// ]
//
// export const mutations = {
//   add(state, data) {
//     try {
//       state.meta[data.handle] = JSON.parse(data.contents)
//
//       if (data.handle === 'metaJsonLdContainer' && state.meta.metaJsonLdContainer?.identity?.sameAs) {
//         for (const sameAs of state.meta.metaJsonLdContainer.identity.sameAs) {
//           for (const social of socials) {
//             if (sameAs.includes(social.find)) {
//               state.socials.push({
//                 link: sameAs,
//                 icon: social.icon,
//               })
//             }
//           }
//         }
//       }
//     } catch (err) {
//       state.meta[data.handle] = data.contents
//     }
//   },
// }
//
// export const actions = {
//   async populate({ commit }) {
//     const client = this.app.apolloProvider.defaultClient
//     const { data } = await client.query({
//       query: gqlSEO,
//       variables: { ...client.defaultOptions.$query.variables },
//     })
//
//     // assign the data
//     for (const [handle, contents] of Object.entries(data.seomatic)) {
//       commit('add', { handle, contents })
//     }
//   },
// }
