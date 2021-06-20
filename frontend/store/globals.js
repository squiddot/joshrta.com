// import { gqlSiteGlobals } from '~/gql/globals.graphql'
//
// export const state = () => ({
//   sets: {},
// })
//
// export const mutations = {
//   add(state, set) {
//     state.sets[set.handle] = set
//   },
// }
//
// const preProcessSet = set => {
//   switch (set.handle) {
//     case 'site':
//       set.backgroundPattern = set.backgroundPattern[0]?.url
//       break
//   }
//   return set
// }
//
// export const actions = {
//   async populate({ commit }) {
//     const client = this.app.apolloProvider.defaultClient
//     const { data } = await client.query({
//       query: gqlSiteGlobals,
//       variables: { ...client.defaultOptions.$query.variables },
//     })
//
//     // assign the data
//     data.globalSets.forEach(set => {
//       commit('add', preProcessSet(set))
//     })
//   },
// }
