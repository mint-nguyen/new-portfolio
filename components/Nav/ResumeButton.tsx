import { Button } from '@chakra-ui/react'
import { RiFileTextLine } from 'react-icons/ri'
import { profile } from 'config/profile'

const ResumeButton = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => (
  <Button
    as="a"
    href={profile.resumeUrl}
    target="_blank"
    rel="noreferrer"
    variant="outlineMint"
    size={size}
    leftIcon={<RiFileTextLine />}
  >
    Resume
  </Button>
)

export default ResumeButton
