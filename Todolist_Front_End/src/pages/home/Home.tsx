import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import TaskCard from "../../components/cards/TaskCard";
import Header from "../../components/header/Header";
import String from "../../components/phrase/String";
import { TaskProps } from "../../types/task";
import { getToken, getUserID } from "../login/tokenManager";

export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const loadTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/task`, {
        params: {
          user_id: `${getUserID()}`,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'ngrok-skip-browser-warning': 'true'
        },
      });

      setTasks(response.data);
      console.log(tasks);

    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  }, []); 

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <Flex
      direction="column"
      gap="3rem"
      maxH="100dvh"
      padding="1rem"
      w="100%"
      alignItems="center"
    >
      <Header />
      <String />
      {/* <Search /> */}
      <Flex
        w="100%"
        wrap="wrap"
        justifyContent="center"
        gap="2rem"
        overflowY="scroll"
      >
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              user_id={task.user_id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              expirationDate={task.expirationDate}
            />
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </Flex>
    </Flex>
  );
}
