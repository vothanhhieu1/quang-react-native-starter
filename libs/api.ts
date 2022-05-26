import { API_URL } from '@@/config'
import _ from 'lodash'
import { getAuthToken } from '@@/libs/authentication'
import { store } from '@@/configStore'
import * as authActions from '@@/actions/auth'
import { reset } from '@@/RootNavigation'

export const apiGet = async (
  path: string,
  params: Record<string, any>,
  headers: Record<string, string> = {},
) => {
  let token = await getAuthToken()
  if (token) {
    headers.Authorization = token.id
  }

  const queries = _(params)
    .entries()
    .reduce((acc, [key, value]) => {
      let type = typeof value
      if (type !== 'undefined') {
        let val = type == 'object' ? JSON.stringify(value) : (value as string)
        acc.push(`${key}=${encodeURI(val)}`)
      }
      return acc
    }, [] as string[])

  const query = _.isEmpty(queries) ? '' : `?${queries.join('&')}`

  const result = await fetch(`${API_URL}${path}${query}`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
  const contentType = result.headers.get('content-type')
  const json =
    contentType && contentType.match('json')
      ? await result.json()
      : await result.text()

  if (result.status >= 400) {
    let message = _.get(json, 'error.message', result.status)
    if (
      message == 'Invalid Access Token' ||
      message == 'Authorization required'
    ) {
      _.throttle(() => {
        message = 'Phiên làm việc đã hết hạn, bạn hãy đăng nhập lại'
        store.dispatch(authActions.logOut())
        reset({ index: 0, routes: [{ name: 'Login' }] })
      }, 3000)()
    }
    throw new Error(message)
  }

  return json
}

export const apiRest = async (
  method: string,
  path: string,
  params: Record<string, any>,
  headers: Record<string, string> = {},
) => {
  let token = await getAuthToken()
  //let token = _.get(store.getState(), 'auth.token')
  if (token) {
    headers.Authorization = token.id
  }

  const body = JSON.stringify(params)

  const result = await fetch(`${API_URL}${path}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(params),
  })

  const contentType = result.headers.get('content-type')
  const json =
    contentType && contentType.match('json')
      ? await result.json()
      : await result.text()

  if (result.status >= 400) {
    console.log('api post error', { method, path, params }, result.status, json)
    let message = _.get(json, 'error.message', result.status)
    if (
      message == 'Invalid AccessToken' ||
      message == 'Authorization Required'
    ) {
      _.throttle(() => {
        message = 'Phiên làm việc đã hết hạn, bạn hãy đăng nhập lại'
        store.dispatch(authActions.logOut())
        reset({ index: 0, routes: [{ name: 'Login' }] })
      }, 3000)()
    }
    throw new Error(message)
  }

  return json
}

export const apiDelete = async (
  path: string,
  params: Record<string, any>,
  headers: Record<string, string> = {},
) => {
  return await apiRest('delete', path, params, -1, headers)
}

export const apiPost = async (
  path: string,
  params: Record<string, any>,
  cacheTime: number = -1,
  headers: Record<string, string> = {},
) => {
  return await apiRest('post', path, params, cacheTime, headers)
}

export const apiPut = async (
  path: string,
  params: Record<string, any>,
  cacheTime: number = -1,
  headers: Record<string, string> = {},
) => {
  return await apiRest('put', path, params, cacheTime, headers)
}

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  const config = await apiGet('/Configs/site', {}, 600)
  if (config && config.value) {
    return config.value
  }
  return null
}

export const getHouseTags = async (): Promise<Tag[] | null> => {
  const tags = await apiGet(
    '/Tags',
    {
      filter: {
        where: { categoryId: 1 },
        fields: ['id', 'name', 'imgM'],
      },
    },
    600,
  )
  return tags
}

export const getHouseGroupTags = async (): Promise<TagCategory[] | null> => {
  const tagCategories = (await apiGet(
    '/TagCategories',
    {
      filter: {
        where: { type: TYPE_ROOM },
        fields: ['id', 'name', 'isMultiple'],
      },
    },
    1200,
  )) as TagCategory[]
  const ids = tagCategories.map(it => it.id)
  const tags = (await apiGet(
    '/Tags',
    {
      filter: {
        where: { categoryId: { inq: ids } },
        fields: ['id', 'name', 'imgS', 'categoryId'],
      },
    },
    1200,
  )) as Tag[]
  const tagByCategory = _.groupBy(tags, 'categoryId')
  tagCategories.forEach(it => (it.tags = tagByCategory[it.id]))
  return tagCategories
}

export const login = async (email: string, password: string): Promise<any> => {
  return await apiPost('/users/login', {
    user: {
      email,
      password,
    },
  })
}

export const logout = async () => {
  await apiPost('/users/logout', {})
}
