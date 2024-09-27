import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function TitleUpdater() {
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    const getPageTitle = (pathname) => {
      // Split the pathname on every '/' and remove any empty strings
      const parts = pathname.split('/').filter(Boolean)

      switch (parts.length) {
        case 0:  // This case handles the '/' route
          return 'Home | Tricer'
        case 1:  // This case handles the '/gender' route
          return `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} | Tricer`
        case 2: {  // This case handles the ':gender/:productType' route
          const gender = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
          const productType = parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
          return `${gender}'s ${productType} | Tricer`
        }
        case 3: {  // This case handles the ':gender/:productType/:productId' route
          // TODO: get the product name
          const productId = params.productId // Get the productId from params
          const productType = parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
          return `${productType}-${productId} | Tricer`
        }
        default:
          return 'Tricer Store'
      }
    }

    document.title = getPageTitle(location.pathname)
  }, [location, params])

  return null
}