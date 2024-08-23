import { Flex } from "@chakra-ui/react";
import Header from "../../components/header/Header";
import String from "../../components/phrase/String";
import axios from "axios";
import { useEffect, useState } from "react";
import Search from "../../components/search/Search";
import TaskCard from "../../components/cards/TaskCard";
import { getToken, getUserID } from "../login/tokenManager";
import { TaskProps } from "../../types/task";


export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]); 

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/task', {
        params: {
          user_id: `${getUserID()}`
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });


      setTasks(response.data);

    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  };

  

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
      <String/>
      <Search />
      <Flex
        w="100%"
        wrap="wrap"
        justifyContent="center"
        gap="2rem"
        overflowY="scroll"
      >
        {tasks.map((task) => (
          <TaskCard 
            key={task.id}
            user_id={task.user_id}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            expirationDate={task.expirationDate}
          />
        ))}
      </Flex>
    </Flex>
  );
}
