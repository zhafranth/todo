import ActionTodo from "./components/ActionTodo";
import Table from "./components/Table";
// import { getToDoList } from "@/data/data";

const Home = async () => {
  // const todoList = await getToDoList();

  return (
    <div className="h-screen px-24 py-16">
      <ActionTodo type="add" />
      <Table data={[]} />
    </div>
  );
};

export default Home;
