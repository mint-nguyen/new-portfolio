import { HStack, IconButton } from '@chakra-ui/react'
import { profile } from 'config/profile'
import usePalette from 'hooks/usePalette'

const SocialLinks = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const p = usePalette()
  return (
    <HStack spacing={2}>
      {profile.socials.map((s) => (
        <IconButton
          key={s.label}
          as="a"
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          icon={<s.icon />}
          size={size}
          isRound
          variant="ghost"
          color={p.muted}
          borderWidth="1px"
          borderColor={p.surfaceBorder}
          transition="all 0.2s ease"
          _hover={{
            color: p.mint,
            borderColor: p.mint,
            transform: 'translateY(-3px)',
            bg: p.mintSoft,
          }}
        />
      ))}
    </HStack>
  )
}

export default SocialLinks
