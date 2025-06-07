import { Avatar, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { LogOut } from "lucide-react"
import TaskCard from "../../components/task-card"
import { useSession } from "../../contexts/auth-context"
import { Task } from "../../types/task-types"

const tasks: Task[] = [
  {
    title: "Lista de Exercícios – Algoritmos de Ordenação",
    matter: "Estrutura de Dados",
    url: "https://seuportal.com/atividades/lista-ordenacao",
    matterUrl: "https://seuportal.com/materias/estrutura-de-dados",
    dateStart: "terça-feira, 10 jun. 2025, 09:00",
    rawStart: "2025-06-10T09:00:00",
    rawEnd: "2025-06-17T23:59:00",
    dateEnd: "2025-06-17T23:59:00",
    daysLeft: 7,
    status: "Pendente",
    dateDetailsInPortuguese: "De 10 de junho de 2025 até 17 de junho de 2025",
    taskDetails:
      "Resolução de uma lista de exercícios sobre algoritmos de ordenação: Bubble Sort, Merge Sort, Quick Sort e Heap Sort.",
  },
  {
    title: "Apresentação – Projeto de Banco de Dados",
    matter: "Banco de Dados",
    url: "https://seuportal.com/atividades/apresentacao-bd",
    matterUrl: "https://seuportal.com/materias/banco-de-dados",
    dateStart: "quarta-feira, 12 jun. 2025, 19:00",
    rawStart: "2025-06-12T19:00:00",
    rawEnd: "2025-06-19T23:59:00",
    dateEnd: "2025-06-19T23:59:00",
    daysLeft: 8,
    status: "Pendente",
    dateDetailsInPortuguese: "De 12 de junho de 2025 até 19 de junho de 2025",
    taskDetails:
      "Preparação e apresentação oral do projeto final de Banco de Dados com modelagem conceitual, lógica e física.",
  },
  {
    title: "Simulado de Prova – Engenharia de Software",
    matter: "Engenharia de Software",
    url: "https://seuportal.com/atividades/simulado-esw",
    matterUrl: "https://seuportal.com/materias/engenharia-de-software",
    dateStart: "sexta-feira, 14 jun. 2025, 14:00",
    rawStart: "2025-06-14T14:00:00",
    rawEnd: "2025-06-21T23:59:00",
    dateEnd: "2025-06-21T23:59:00",
    daysLeft: 9,
    status: "Pendente",
    dateDetailsInPortuguese: "De 14 de junho de 2025 até 21 de junho de 2025",
    taskDetails:
      "Realização de um simulado com questões teóricas e práticas sobre Engenharia de Software.",
  },
  {
    title: "Relatório – Estudo de Caso em IHC",
    matter: "Interação Humano-Computador",
    url: "https://seuportal.com/atividades/relatorio-ihc",
    matterUrl: "https://seuportal.com/materias/interacao-humano-computador",
    dateStart: "quinta-feira, 6 jun. 2025, 12:00",
    rawStart: "2025-06-06T12:00:00",
    rawEnd: "2025-06-15T23:59:00",
    dateEnd: "2025-06-15T23:59:00",
    daysLeft: 9,
    status: "Pendente",
    dateDetailsInPortuguese: "De 6 de junho de 2025 até 15 de junho de 2025",
    taskDetails:
      "Elaboração de um relatório de estudo de caso baseado na análise de um sistema interativo existente, aplicando os princípios de IHC.",
  },
]

export default function HomePage() {
  const { signOut, user } = useSession()
  const userData = user()

  const name = userData?.name || ""
  const firstTwoWords = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")

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
            <Box>
              <Heading size="md" fontFamily="Poppins, sans-serif">
                Olá, {firstTwoWords}
              </Heading>
              <Text fontSize="sm" fontFamily="Poppins, sans-serif">
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

      <Box flex="1" p={4} w="full" overflowY="auto" overflowX="hidden">
        <Heading
          size="lg"
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
          color="#0D1B34">
          Atividades Pendentes
        </Heading>
        {tasks.map((task, index) => (
          <TaskCard key={index} data={task} />
        ))}
      </Box>
    </Flex>
  )
}
