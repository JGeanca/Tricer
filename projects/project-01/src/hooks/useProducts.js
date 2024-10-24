import { productService } from '../services/productService'
import { useQuery } from '@tanstack/react-query'

export const useProducts = (gender, type, isNew) => {
  return useQuery({
    queryKey: ['products', gender, type, isNew],
    queryFn: () => productService.fetchProducts({ gender, type, isNew }),
    staleTime: 1000 * 60 * 5, // 5 minutes -> The data will be considered stale after 5 minutes
    // after that, the next time the data is requested, it will be re-fetched
  })
}

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.fetchProductById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes -> The data will be considered stale after 5 minutes
    enabled: !!id, // Only fetch the product if the id is truthy.
  })
}