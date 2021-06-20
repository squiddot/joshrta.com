import { camelCase } from 'change-case'

export default (context, inject) => {
  inject('camelCase', camelCase)
}
