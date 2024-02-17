import { useQuery } from "@apollo/client";

import ProjectList from "../components/ProjectList/ProjectList";

import { QUERY_PROJECTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  return (
    <main className="text-center">
      <div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectList 
            projects={projects} 
            title="Current Projects..." 
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
