import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  RiArrowRightUpLine,
  RiCheckboxCircleLine,
  RiFlashlightLine,
} from 'react-icons/ri'
import { Experience } from 'config/experience'
import usePalette from 'hooks/usePalette'

export const Marker = ({
  children,
  bg,
}: {
  children: React.ReactNode
  bg?: string
}) => {
  const p = usePalette()
  return (
    <Flex
      position="absolute"
      left={0}
      top={0}
      boxSize={{ base: '36px', md: '80px' }}
      borderRadius="full"
      bg={bg ?? p.logoBg}
      borderWidth="2px"
      borderColor={p.surfaceBorder}
      align="center"
      justify="center"
      overflow="hidden"
      p={{ base: 1, md: 3 }}
      zIndex={1}
    >
      {children}
    </Flex>
  )
}

export const Card = ({ children }: { children: React.ReactNode }) => {
  const p = usePalette()
  return (
    <Box
      flex={1}
      p={{ base: 4, md: 6 }}
      borderRadius="2xl"
      bg={p.surface}
      borderWidth="1px"
      borderColor={p.surfaceBorder}
      transition="border-color 0.2s ease, transform 0.2s ease"
      _hover={{ borderColor: p.mint, transform: 'translateX(4px)' }}
    >
      {children}
    </Box>
  )
}

const TimelineItem = ({ item }: { item: Experience }) => {
  const p = usePalette()
  return (
    <Flex as="li" position="relative" pb={{ base: 8, md: 10 }} pl={{ base: 14, md: 28 }}>
      <Marker bg={item.logoBg}>
        <Image
          src={item.logo}
          alt={`${item.longName} logo`}
          maxW="100%"
          maxH="100%"
          objectFit="contain"
          fallback={<Skeleton boxSize="100%" borderRadius="full" />}
        />
      </Marker>
      <Card>
        <Stack spacing={1}>
          <Flex justify="space-between" align="baseline" wrap="wrap">
            <Text fontWeight={700} fontSize={{ base: 'md', md: 'lg' }}>
              {item.position}
            </Text>
            <Text fontSize="sm" color={p.muted}>
              {item.duration}
            </Text>
          </Flex>
          <HStack spacing={2} wrap="wrap">
            <Link
              href={item.url}
              isExternal
              fontWeight={600}
              display="inline-flex"
              alignItems="center"
            >
              {item.longName}
              <Icon as={RiArrowRightUpLine} ml={1} />
            </Link>
            <Text fontSize="sm" color={p.muted}>
              · {item.tagline}
            </Text>
          </HStack>
        </Stack>

        {item.milestone && (
          <HStack
            mt={4}
            spacing={3}
            p={3}
            borderRadius="xl"
            bg={p.mintSoft}
            align="flex-start"
          >
            <Icon as={RiFlashlightLine} color={p.coral} mt="2px" />
            <Text fontSize="sm">
              <Text as="span" fontWeight={700} color={p.mint}>
                {item.milestone.when}:{' '}
              </Text>
              {item.milestone.label}
            </Text>
          </HStack>
        )}

        <List spacing={2} mt={4}>
          {item.roles.map((role) => (
            <ListItem key={role} display="flex" alignItems="flex-start">
              <ListIcon as={RiCheckboxCircleLine} color={p.mint} mt="4px" flexShrink={0} />
              <Text as="span" fontSize="sm" color={p.muted}>
                {role}
              </Text>
            </ListItem>
          ))}
        </List>
      </Card>
    </Flex>
  )
}

export default TimelineItem
