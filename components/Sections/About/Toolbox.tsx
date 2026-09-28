import { Box, HStack, Icon, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { RiSparkling2Line } from 'react-icons/ri'
import { skillGroups, currentlyLearning, fallbackIcon } from 'config/skills'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'

const GroupLabel = ({
  icon,
  label,
  color,
}: {
  icon: React.ElementType
  label: string
  color: string
}) => (
  <HStack mb={3} spacing={2}>
    <Icon as={icon} color={color} boxSize={4} />
    <Text
      as="span"
      fontSize="xs"
      fontWeight={700}
      textTransform="uppercase"
      letterSpacing="0.12em"
      color={color}
    >
      {label}
    </Text>
  </HStack>
)

const Toolbox = () => {
  const p = usePalette()
  return (
    <Stack spacing={6}>
      {skillGroups.map((group) => (
        <Box key={group.label}>
          <GroupLabel icon={group.icon} label={group.label} color={p.muted} />
          <Wrap spacing={2}>
            {group.items.map((skill) => (
              <WrapItem key={skill.name}>
                <Chip
                  icon={skill.icon ?? fallbackIcon}
                  label={skill.name}
                  variant="soft"
                  size="sm"
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      ))}
      <Box pt={2}>
        <GroupLabel icon={RiSparkling2Line} label="Currently learning" color={p.coral} />
        <Wrap spacing={2}>
          {currentlyLearning.map((item) => (
            <WrapItem key={item}>
              <Chip icon={RiSparkling2Line} label={item} variant="coral" size="sm" />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Stack>
  )
}

export default Toolbox
