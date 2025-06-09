import { Clock, FileText } from "lucide-react"
import { Box, Flex, Heading, Separator, Text } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { Task } from "../types/task-types"
import { getRandomColor } from "../scripts/color"
import { useCountdown } from "../hooks/use-countdown"
import { useTasks } from "../hooks/use-tasks"

const TaskCard = ({ data }: { data: Task }) => {
  const { isOverdue, dinamicCountdownText } = useCountdown(data.dateEnd)
  const bgColor = useMemo(() => getRandomColor(), [])

  return (
    <Box
      w="90%"
      minW="353px"
      mx="auto"
      my={6}
      bg="white"
      p={4}
      rounded="xl"
      borderWidth="1px"
      borderColor="#bfdbfe"
      shadow="sm"
      _hover={{ shadow: "md", cursor: "pointer" }}
      onClick={() => {}}>
      <Flex align="flex-start" gap={3} minH="70%">
        <Flex
          p={2}
          rounded="md"
          align="center"
          justify="center"
          bg={bgColor}
          flexShrink={0}
          w="40px"
          h="40px">
          <FileText size={24} color="#ffffff" />
        </Flex>

        <Box flex="1">
          <Heading
            size="md"
            fontFamily="Poppins, sans-serif"
            fontWeight="bold"
            color="#0D1B34">
            {data.title}
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            fontFamily="Poppins, sans-serif"
            fontWeight="normal"
            color="#64748b">
            {data.matter}
          </Text>
        </Box>
      </Flex>

      <Separator borderColor="#bfdbfe" my={3} />

      <Flex align="center">
        <Clock size={18} color={isOverdue ? "#ef4444" : "#fbbf24"} />
        <Text
          ml={2}
          fontSize="sm"
          fontWeight="medium"
          color={isOverdue ? "#ef4444" : "#fbbf24"}>
          {dinamicCountdownText()}
        </Text>
      </Flex>
    </Box>
  )
}

export default TaskCard
