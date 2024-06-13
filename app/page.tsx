import ActionFooter from "./components/ActionFooter";
import Card from "./components/Card";

const Home = async () => {
  const data = [1, 2, 3, 4, 5];
  return (
    <div className="container min-h-screen bg-[#131315]">
      <div className="flex justify-center items-center py-8 flex-col gap-y-8 relative">
        {data.map((item) => (
          <Card key={item} />
        ))}
        <ActionFooter />
      </div>
    </div>
  );
};

export default Home;
