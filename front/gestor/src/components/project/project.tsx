import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Divider,
  Tooltip,
  Pagination
} from "@mui/material";
import { PlayArrow, Pause, Replay, CalendarMonth, Person } from "@mui/icons-material";
import type { IProject } from "../../interfaces/projects";
import { StatusBadge } from "../badge/badge";
import UpdateProjectModal from "../updateProject/updateProject";
import { useProjects } from "../../hooks/useProjects";
import { toast } from "react-toastify";

interface ComponentProjectsProps {
  projects: IProject[];
  setProyect: React.Dispatch<React.SetStateAction<IProject[]>>;
}

export default function ComponentProjects({ projects, setProyect }: ComponentProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { changeStatus, error, loading, response, updateProject } = useProjects();

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const handleOpenModal = (project: IProject) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleUpdateProject = (updated: IProject) => {
    updateProject(updated.project_id, updated);
    setModalOpen(false);
    if (setProyect) {
      setProyect((prevProjects) =>
        prevProjects.map((project) =>
          project.project_id === updated.project_id ? updated : project
        )
      );
    }
    setSelectedProject(null);
  };

  const handleChangeStatus = (project: IProject, status: string) => {
    changeStatus(project.project_id, status);
    if (setProyect) {
      setProyect((prevProjects) =>
        prevProjects.map((proj) =>
          proj.project_id === project.project_id ? { ...proj, status } : proj
        )
      );
    }
  };

  useEffect(() => {
    if (response) {
      toast.success("Proyecto actualizado correctamente");
    }

    if (error) {
      toast.error("Error al actualizar el proyecto");
    }
  }, [response, error]);

  // Filtrado por página
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      {/* Paginación superior */}
      <div className="flex justify-center mt-6 mb-2">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </div>

      {/* Lista de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {paginatedProjects.map((item) => (
          <Card
            key={item.project_id}
            sx={{
              width: "100%",
              maxWidth: 700,
              p: 0,
              borderRadius: 3,
              overflow: "visible",
              position: "relative",
              background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
              ":hover": {
                background: "linear-gradient(to bottom, #f0f4ff, #e0e7ff)",
                cursor: "pointer",
              },
            }}
            className="hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <CardContent className="p-6 space-y-4" onClick={() => handleOpenModal(item)}>
              <div className="space-y-2">
                <Box className="flex justify-between items-center ">
                  <Typography variant="h6" fontWeight="bold" className="text-gray-800" sx={{ lineHeight: 1.3 }}>
                    {item.title} {item.project_id}
                  </Typography>

                  <StatusBadge status={item.status} />
                </Box>

                <div className="flex items-center text-gray-600">
                  <Person fontSize="small" className="mr-1" />
                  <Typography variant="body2">{item.responsible}</Typography>
                </div>
              </div>

              <Typography variant="body2" className="text-gray-600 pt-1 text-justify">
                {item.description}
              </Typography>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center">
                  <CalendarMonth fontSize="small" className="mr-1 text-gray-400" />
                  <span>Inicio: {new Date(item.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <CalendarMonth fontSize="small" className="mr-1 text-gray-400" />
                  <span>Fin: {new Date(item.end_date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.technologies_used?.map((tech) => (
                  <Chip
                    key={tech.id}
                    label={tech.name}
                    size="small"
                    sx={{
                      borderRadius: "6px",
                      backgroundColor: "rgba(25, 118, 210, 0.08)",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.15)",
                      },
                    }}
                  />
                ))}
              </div>

              <Divider className="my-3" />

              <div className="flex justify-between pt-2 gap-2">
                <Tooltip title="Iniciar proyecto">
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    size="small"
                    color="success"
                    className="flex-1 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeStatus(item, "Start");
                    }}
                    sx={{ borderRadius: "8px", textTransform: "none", boxShadow: "none" }}
                  >
                    Iniciar
                  </Button>
                </Tooltip>

                <Tooltip title="Pausar proyecto">
                  <Button
                    variant="contained"
                    startIcon={<Pause />}
                    size="small"
                    color="warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeStatus(item, "Stop");
                    }}
                    className="flex-1 shadow-sm"
                    sx={{ borderRadius: "8px", textTransform: "none", boxShadow: "none" }}
                  >
                    Pausar
                  </Button>
                </Tooltip>

                <Tooltip title="Reiniciar proyecto">
                  <Button
                    variant="contained"
                    startIcon={<Replay />}
                    size="small"
                    color="info"
                    className="flex-1 shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeStatus(item, "Restart");
                    }}
                    sx={{ borderRadius: "8px", textTransform: "none", boxShadow: "none" }}
                  >
                    Reiniciar
                  </Button>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}

        {selectedProject && (
          <UpdateProjectModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            project={selectedProject}
            onSave={handleUpdateProject}
          />
        )}
      </div>
    </>
  );
}
