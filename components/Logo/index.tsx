import { memo } from 'react'
import { Box, Image } from '@chakra-ui/react'

const Logo = ({ size = 40 }: { size?: number }) => (
  <Box
    as="a"
    href="#top"
    aria-label="Back to top"
    display="inline-flex"
    alignItems="center"
    transition="transform 0.25s ease"
    _hover={{ transform: 'rotate(-12deg) scale(1.08)' }}
  >
    <Image
      src="/logo.png"
      alt="Mint Nguyen leaf logo"
      htmlWidth={size}
      htmlHeight={size}
      boxSize={`${size}px`}
      objectFit="contain"
    />
  </Box>
)

export default memo(Logo)
