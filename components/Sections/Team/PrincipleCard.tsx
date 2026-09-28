import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { Principle } from 'config/team'
import usePalette from 'hooks/usePalette'

const PrincipleCard = ({ principle, index }: { principle: Principle; index: number }) => {
  const p = usePalette()
  return (
    <Box
      as="article"
      h="100%"
      p={{ base: 6, md: 7 }}
      borderRadius="2xl"
      bg={p.surface}
      borderWidth="1px"
      borderColor={p.surfaceBorder}
      transition="transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
      _hover={{
        transform: 'translateY(-6px)',
        borderColor: p.mint,
        boxShadow: '0 24px 48px -24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <Flex align="center" justify="space-between" mb={5}>
        <Flex
          boxSize="48px"
          borderRadius="xl"
          bg={p.mintSoft}
          color={p.mint}
          align="center"
          justify="center"
        >
          <Icon as={principle.icon} boxSize={6} />
        </Flex>
        <Text fontSize="sm" fontWeight={700} color={p.coral}>
          0{index + 1}
        </Text>
      </Flex>
      <Heading as="h3" fontSize="lg" mb={3} lineHeight={1.3}>
        {principle.title}
      </Heading>
      <Text fontSize="md" color={p.muted}>
        {principle.body}
      </Text>
    </Box>
  )
}

export default PrincipleCard
