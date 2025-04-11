import React from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button
} from "@mui/material";

interface FiltersProps {
  technologies: string[];
  responsables: string[];
  selectedTech: string;
  selectedResp: string;
  onTechChange: (value: string) => void;
  onRespChange: (value: string) => void;
  onClear: () => void;
}

export default function ProjectFilters({
  technologies,
  responsables,
  selectedTech,
  selectedResp,
  onTechChange,
  onRespChange,
  onClear
}: FiltersProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 text-start">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filtros</h2>
        <p className="text-sm text-gray-500 ">
          Filtra los proyectos por tecnología o responsable
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4 ">
        <FormControl fullWidth >
          <InputLabel id="tech-select-label">Filtrar por tecnología</InputLabel>
          <Select
            labelId="tech-select-label"
            value={selectedTech}
            label="Filtrar por tecnología"
            onChange={(e) => onTechChange(e.target.value)}
            size="small"
            className="bg-white rounded-lg"
          >
            <MenuItem value="">Todas las tecnologías</MenuItem>
            {technologies.map((tech) => (
              <MenuItem key={tech} value={tech}>
                {tech}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="resp-select-label">Filtrar por responsable</InputLabel>
          <Select
            labelId="resp-select-label"
            value={selectedResp}
            label="Filtrar por responsable"
            onChange={(e) => onRespChange(e.target.value)}
            size="small"
            className="bg-white rounded-lg"
          >
            <MenuItem value="">Todos los responsables</MenuItem>
            {responsables.map((resp) => (
              <MenuItem key={resp} value={resp}>
                {resp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex">
        <Button
          onClick={onClear}
          variant="outlined"
          className="mt-2"
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
