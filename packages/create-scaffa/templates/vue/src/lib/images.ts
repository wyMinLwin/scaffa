export function createPlaceholderImage(text: string, size: number = 300, id?: number): string {
  const initials = text.slice(0, 2).toUpperCase()

  // Colors for variety
  const colors = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
  ]

  const color = id ? colors[id % colors.length] : colors[0]
  const fontSize = Math.floor(size * 0.24) // 24% of size

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${color}"/>
      <text x="${size / 2}" y="${size / 2}" font-family="system-ui" font-size="${fontSize}" font-weight="bold" 
            text-anchor="middle" dominant-baseline="central" fill="white">
        ${initials}
      </text>
    </svg>
  `)}`
}

export function getProductImage(product: {
  id: number
  title: string
  thumbnail?: string
}): string {
  if (product.thumbnail && product.thumbnail.trim()) {
    return product.thumbnail
  }

  return createPlaceholderImage(product.title, 300, product.id)
}

export function getUserAvatar(name: string = 'User', size: number = 32): string {
  return createPlaceholderImage(name, size)
}
