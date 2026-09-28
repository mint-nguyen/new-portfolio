import { HStack, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import usePalette from 'hooks/usePalette'

export type ChipProps = {
  label: string
  icon?: IconType
  variant?: 'solid' | 'soft' | 'coral'
  size?: 'sm' | 'md'
}

const Chip = ({ label, icon, variant = 'solid', size = 'md' }: ChipProps) => {
  const p = usePalette()
  const fills = {
    solid: { bg: p.surface, color: p.text, iconColor: p.mint, border: p.surfaceBorder },
    soft: { bg: p.mintSoft, color: p.text, iconColor: p.mint, border: 'transparent' },
    coral: { bg: p.coralSoft, color: p.text, iconColor: p.coral, border: 'transparent' },
  }[variant]
  return (
    <HStack
      spacing={2}
      px={size === 'sm' ? 3 : 4}
      py={size === 'sm' ? 1 : 2}
      borderRadius="full"
      bg={fills.bg}
      color={fills.color}
      borderWidth="1px"
      borderColor={fills.border}
      boxShadow={variant === 'solid' ? '0 8px 24px rgba(0, 0, 0, 0.12)' : undefined}
      fontSize={size === 'sm' ? 'sm' : 'md'}
      fontWeight={500}
      whiteSpace="nowrap"
    >
      {icon && <Icon as={icon} color={fills.iconColor} boxSize={size === 'sm' ? 4 : 5} />}
      <Text as="span">{label}</Text>
    </HStack>
  )
}

export default Chip
