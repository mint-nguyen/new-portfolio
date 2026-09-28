import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { RiExternalLinkLine } from 'react-icons/ri'
import { Work } from 'config/works'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'

const Labelled = ({ label, text }: { label: string; text: string }) => {
  const p = usePalette()
  return (
    <Box>
      <Text
        as="span"
        fontSize="xs"
        fontWeight={700}
        textTransform="uppercase"
        letterSpacing="0.12em"
        color={p.mint}
      >
        {label}
      </Text>
      <Text fontSize="sm" color={p.muted} mt={1}>
        {text}
      </Text>
    </Box>
  )
}

const CaseStudyCard = ({ work, index }: { work: Work; index: number }) => {
  const p = usePalette()
  const flip = index % 2 === 1
  return (
    <Box
      as="article"
      role="group"
      borderRadius="3xl"
      overflow="hidden"
      bg={p.surface}
      borderWidth="1px"
      borderColor={p.surfaceBorder}
      transition="border-color 0.25s ease, box-shadow 0.25s ease"
      _hover={{ borderColor: p.mint, boxShadow: '0 30px 60px -30px rgba(0, 0, 0, 0.45)' }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box
          position="relative"
          order={{ base: 0, md: flip ? 1 : 0 }}
          minH={{ base: '220px', md: '100%' }}
          overflow="hidden"
          bg={p.mintSoft}
        >
          <Image
            src={work.image}
            alt={`${work.title} screenshot`}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition={work.objectPosition}
            loading="lazy"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
            fallback={<Skeleton w="100%" h="100%" />}
          />
        </Box>
        <Stack p={{ base: 6, md: 8, lg: 10 }} spacing={4}>
          <Text fontSize="sm" fontWeight={700} color={p.coral}>
            0{index + 1}
          </Text>
          <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} lineHeight={1.2}>
            {work.title}
          </Heading>
          <Labelled label="Problem" text={work.problem} />
          <Labelled label="What I did" text={work.didWhat} />
          <Labelled label="Outcome" text={work.outcome} />
          {work.metric && (
            <Text fontWeight={800} fontSize="lg" bgGradient={p.gradient} bgClip="text">
              {work.metric}
            </Text>
          )}
          <Wrap spacing={2}>
            {work.tags.map((tag) => (
              <WrapItem key={tag}>
                <Chip label={tag} variant="soft" size="sm" />
              </WrapItem>
            ))}
          </Wrap>
          <Box pt={2}>
            <Button
              as="a"
              href={work.ctaUrl}
              target="_blank"
              rel="noreferrer"
              variant="outlineMint"
              size="sm"
              rightIcon={<RiExternalLinkLine />}
            >
              {work.ctaLabel}
            </Button>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}

export default CaseStudyCard
