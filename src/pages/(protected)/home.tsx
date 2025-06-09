import { Avatar, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { LogOut, Repeat } from "lucide-react"
import TaskCard from "../../components/task-card"
import { useSession } from "../../contexts/auth-context"
import { Task } from "../../types/task-types"
import { useTasks } from "../../hooks/use-tasks"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { user, signOut } = useSession()
  const userData = user()

  const {
    loading,
    error,
    fetchTasks,
    getTasksBy
  } = useTasks();
  const tasks = getTasksBy({
    include: ["upcoming", "due"]
  })
  const hasTasks = tasks && Object.values(tasks).length > 0;

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    if (!userData) return

    try {
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefas:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const [dotCount, setDotCount] = useState(0);
  const dots = ".".repeat(dotCount);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDotCount(dc => (dc + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <Flex
      backgroundColor="white"
      direction="column"
      align="center"
      h="600px"
      w="400px"
      rounded="lg"
      shadow="md"
      overflow="hidden">
      <Box bg="#9A3234" w="full" p={4} roundedBottom="lg" color="white">
        <Flex align="center" justify="space-between" mb={2}>
          <Flex align="center" gap={3} paddingY={2}>
            <Avatar.Root>
              <Avatar.Fallback name={userData?.name} />
              <Avatar.Image src={userData?.userPicture} />
            </Avatar.Root>
            <Box style={{ width: "80%" }}>
              <Text
                as="div"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "1.25rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                Olá,{" "}
                <span style={{ fontWeight: 600 }}>
                  {userData?.name.split(" ")
                    .slice(0, 1)
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
              </Text>
              <Text
                as="div"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                R.A: {userData?.authorization.login}
              </Text>
            </Box>
          </Flex>

          <IconButton
            backgroundColor="transparent"
            aria-label="logout"
            onClick={signOut}>
            <LogOut size={18} />
          </IconButton>
        </Flex>
      </Box>

      <Box
        flex="1"
        paddingY={4}
        w="full"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Flex align="center" justify="space-between" pl={4} pr={4}>
          <Heading
            size="lg"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
            color="#0D1B34"
          >
            Atividades Pendentes
          </Heading>

          <IconButton
            aria-label="Recarregar tarefas"
            onClick={onRefresh}
            loading={refreshing}
            variant="ghost"
            backgroundColor="#9A3234"
            color={"white"}
            _hover={{ backgroundColor: "#7a2629" }}
            size="sm"
          >
            <Repeat size={18} />
          </IconButton>
        </Flex>

        {hasTasks ? (
          <Box
            flex="1"
            overflowY="auto"
            w={"full"}
          >
            {Object.values(tasks).map((task, index) => (
              <TaskCard key={index} data={task} />
            ))}
          </Box>
        ) : (
          <Flex
            flex="1"
            align="center"
            justify="center"
          >
            <Text
              as="div"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "1rem",
                color: "#94a3b8",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {loading ? `Buscando atividades${dots}` : "Não há atividades por enquanto"}
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  )
}
