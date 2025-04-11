import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete
} from "@mui/material";
import { IProject } from "../../interfaces/projects";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newProject: IProject) => void;
  allTechnologies: { id: number; name: string }[];
}

const statusOptions = ["Start", "Restart", "In Process", "Stop"];

const initialProject: IProject = {
  project_id: 0,
  title: "",
  responsible: "",
  status: "Start",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  description: "",
  technologies_used: []
};

export default function CreateProjectModal({
  open,
  onClose,
  onCreate,
  allTechnologies
}: CreateProjectModalProps) {
  const [newProject, setNewProject] = useState<IProject>(initialProject);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name!]: value
    }));
  };

  const handleTechChange = (
    _event: any,
    value: { id: number; name: string }[]
  ) => {
    setNewProject((prev) => ({
      ...prev,
      technologies_used: value
    }));
  };

  const handleSubmit = () => {
    if (!newProject.title.trim()) return alert("El título es obligatorio.");
    onCreate(newProject);
    setNewProject(initialProject);
  };

  return (
    <Dialog open={open} onClose={onClose}  maxWidth="md" fullWidth>
      <DialogTitle className="text-2xl font-bold text-gray-800">
        ➕ Crear Proyecto
      </DialogTitle>

      <DialogContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={newProject.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Responsable"
            name="responsible"
            value={newProject.responsible}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={newProject.status}
              onChange={handleChange}
              label="Estado"
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="date"
            name="start_date"
            label="Fecha de inicio"
            value={newProject.start_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            type="date"
            name="end_date"
            label="Fecha de finalización"
            value={newProject.end_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="mt-4">
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descripción"
            name="description"
            value={newProject.description}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <Autocomplete
            multiple
            options={allTechnologies}
            getOptionLabel={(option) => option.name}
            value={newProject.technologies_used}
            onChange={handleTechChange}
            renderInput={(params) => (
              <TextField {...params} label="Tecnologías usadas" placeholder="Seleccionar..." />
            )}
          />
        </div>
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-end space-x-4">
        <Button onClick={onClose} variant="outlined" className="text-gray-700">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Crear Proyecto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
