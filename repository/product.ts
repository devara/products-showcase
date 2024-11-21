import api, { type ApiResponse } from '.'

export async function getProducts (params?: Record<string, unknown>): ApiResponse<Product[]> {
  return await api(getPath('pathGetProducts'), {
    method: 'GET',
    params,
  })
}

export async function getProduct (id: number | string): ApiResponse<Product> {
  return await api(getPath('pathGetProduct', { id }), { method: 'GET' })
}

export async function getProductOperatingSystems (): ApiResponse<ProductOperatingSystem[]> {
  return await api(getPath('pathGetOs'))
}
