import { Box, Button, Stack } from '@chakra-ui/react'
import { navLinks } from 'config/nav'
import usePalette from 'hooks/usePalette'

const NavLinks = ({
  direction = 'row',
  onNavigate,
}: {
  direction?: 'row' | 'column'
  onNavigate?: () => void
}) => {
  const p = usePalette()
  const isColumn = direction === 'column'
  return (
    <Stack
      as="ul"
      direction={direction}
      spacing={isColumn ? 2 : 1}
      listStyleType="none"
      m={0}
      p={0}
      align={isColumn ? 'stretch' : 'center'}
    >
      {navLinks.map((link) => (
        <Box as="li" key={link.href}>
          <Button
            as="a"
            href={link.href}
            onClick={onNavigate}
            variant="ghostNav"
            size={isColumn ? 'lg' : 'sm'}
            fontSize={isColumn ? '2xl' : 'sm'}
            width={isColumn ? '100%' : 'auto'}
            justifyContent={isColumn ? 'flex-start' : 'center'}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              left: '16px',
              right: '16px',
              bottom: '6px',
              height: '2px',
              borderRadius: 'full',
              bg: p.mint,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.25s ease',
            }}
            _hover={{ _after: { transform: 'scaleX(1)' } }}
          >
            {link.label}
          </Button>
        </Box>
      ))}
    </Stack>
  )
}

export default NavLinks
