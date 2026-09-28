import { useEffect } from 'react'
import { profile } from 'config/profile'

const ConsoleGreeting = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '%cHey, you found the console! 👀',
      'font-size:16px;font-weight:700;color:#7EE0BC;'
    )
    // eslint-disable-next-line no-console
    console.log(
      `%cI like you already. Say hi: ${profile.email}  ·  ${profile.github}`,
      'font-size:12px;color:#9FB5A9;'
    )
  }, [])
  return null
}

export default ConsoleGreeting
