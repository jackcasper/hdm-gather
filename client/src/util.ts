export function sanitizeId(id: string) {
  let sanitized = id

  // Remove the '-ss' suffix if it exists and the ID length is greater than 9
  if (sanitized.length > 9 && sanitized.endsWith('-ss')) {
    sanitized = sanitized.substring(0, sanitized.length - 3)
  }

  // Replace any characters that are not alphanumeric with 'G'
  return sanitized.replace(/[^0-9a-z]/gi, 'G')
}

// An array of color values used for determining name colors
const colorArr = [
  '#7bf1a8',
  '#ff7e50',
  '#9acd32',
  '#daa520',
  '#ff69b4',
  '#c085f6',
  '#1e90ff',
  '#5f9da0',
]

// Function to determine a name's color based on the first character's charCode
export function getColorByString(string: string) {
  return colorArr[Math.floor(string.charCodeAt(0) % colorArr.length)]
}

// Function to generate an avatar string from a name
export function getAvatarString(name: string) {
  const part = name.split(' ')
  
  // Return the initials of the first and last names or just the initial of the first name
  return part.length < 2 ? part[0][0] : part[0][0] + part[1][0]
}
