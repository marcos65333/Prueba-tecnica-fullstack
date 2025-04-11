import React, { useEffect, useState } from "react";
import { IProject } from "../../interfaces/projects";
import { useProjects } from "../../hooks/useProjects";
import ComponentProjects from "../../components/project/project";
import ProjectFilters from "../../components/filter/filter";
import CreateProjectModal from "../../components/createProjects/createProjects";
import { techs } from "../../utils/data";
import { toast } from "react-toastify";

export default function Home() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedResp, setSelectedResp] = useState("");
  const { getAllProjects, createProject,response, loading } = useProjects();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [cacheable, setCacheable] = useState<IProject>({} as IProject);

  const handleCreateProject = (newProject: IProject) => {
    // Aquí puedes hacer una petición a tu API para guardarlo
    setCacheable(newProject);
    createProject(newProject)
    setOpenCreateModal(false);
  };

  useEffect(() => {
    getAllProjects((data: IProject[]) => {
      setProjects(data);
      setFilteredProjects(data); // inicializa el filtro
    });
  }, []);

  useEffect(() => {
    if (response) {
      toast.success(response?.message)
      cacheable.project_id =response?.project_id;
      setProjects((prev) => [...prev, cacheable]);
      setFilteredProjects((prev) => [...prev, cacheable]);
      setCacheable({} as IProject);
    }
  }, [response]);

  // Extraer opciones únicas
  const technologies = [
    ...new Set(projects.flatMap((p) => p.technologies_used?.map((t) => t.name))),
  ].filter(Boolean);

  const responsables = [...new Set(projects.map((p) => p.responsible))].filter(Boolean);

  // Filtrado dinámico
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesTech =
        !selectedTech ||
        project.technologies_used?.some((t) => t.name === selectedTech);
      const matchesResp = !selectedResp || project.responsible === selectedResp;
      return matchesTech && matchesResp;
    });
    setFilteredProjects(filtered);
  }, [selectedTech, selectedResp, projects]);

  const handleClearFilters = () => {
    setSelectedTech("");
    setSelectedResp("");
  };

  return (
    <div className="container mx-auto flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col space-y-2 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 text-start">Gestor de Proyectos</h1>
          <p className="text-gray-500 text-start">
            Listado de proyectos registrados en el sistema
          </p>
        </div>

        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex mb-2 md:w-fit w-full hover:cursor-pointer"
            type="button"
            title="Crear nuevo proyecto"
            onClick={() => setOpenCreateModal(true)}
          >
            ➕ Crear Nuevo Proyecto
          </button>
        </div>

        <ProjectFilters
          technologies={technologies}
          responsables={responsables}
          selectedTech={selectedTech}
          selectedResp={selectedResp}
          onTechChange={setSelectedTech}
          onRespChange={setSelectedResp}
          onClear={handleClearFilters}
        />

        <ComponentProjects projects={filteredProjects} setProyect={setProjects} />

        <CreateProjectModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          onCreate={handleCreateProject}
          allTechnologies={techs}
        />
      </div>
    </div>
  );
}
