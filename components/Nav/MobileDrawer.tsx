import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Stack,
  Box,
} from '@chakra-ui/react'
import NavLinks from './Links'
import ResumeButton from './ResumeButton'
import SocialLinks from 'components/Ui/SocialLinks'
import usePalette from 'hooks/usePalette'

const MobileDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const p = usePalette()
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
      <DrawerOverlay />
      <DrawerContent bg={p.bg} color={p.text}>
        <DrawerBody pt={24} px={6}>
          <Stack spacing={8}>
            <NavLinks direction="column" onNavigate={onClose} />
            <Box>
              <ResumeButton size="lg" />
            </Box>
            <SocialLinks size="lg" />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
