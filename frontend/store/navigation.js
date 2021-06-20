// import { gqlNavigations } from '~/gql/globals'
//
// export const state = () => ({
//   navs: {},
// })
//
// export const mutations = {
//   add(state, nav) {
//     state.navs[nav.handle] = nav.nodes
//   },
// }
//
// export const actions = {
//   async populate({ commit }) {
//     const client = this.app.apolloProvider.defaultClient
//     const { data } = await client.query({
//       query: gqlNavigations,
//       variables: { ...client.defaultOptions.$query.variables },
//     })
//
//     const navs = {}
//
//     for (const node of data.navigations) {
//       if (!navs[node.navHandle]) {
//         navs[node.navHandle] = []
//       }
//       navs[node.navHandle].push(node)
//     }
//
//     for (const [handle, nodes] of Object.entries(navs)) {
//       commit('add', { handle, nodes })
//     }
//   },
// }
