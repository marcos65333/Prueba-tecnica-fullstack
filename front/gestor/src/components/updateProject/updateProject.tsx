import React from "react";
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
  InputLabel
} from "@mui/material";
import { IProject } from "../../interfaces/projects";

interface UpdateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedProject: IProject) => void;
  project: IProject;
}

const statusOptions = ["Start", "Restart", "In Process", "Stop"];

export default function UpdateProjectModal({
  open,
  onClose,
  onSave,
  project,
}: UpdateProjectModalProps) {
  const [editedProject, setEditedProject] = React.useState<IProject>(project);

  React.useEffect(() => {
    setEditedProject(project);
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name!]: value
    }));
  };

  const handleSave = () => {
    onSave(editedProject);
  };

  const formatDate = (date: string) =>
    date ? new Date(date).toISOString().slice(0, 10) : "";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="text-xl font-bold text-gray-800">
        ✏️ Actualizar Proyecto
      </DialogTitle>

      <DialogContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={editedProject.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Responsable"
            name="responsible"
            value={editedProject.responsible}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={editedProject.status}
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
            value={formatDate(editedProject.start_date)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            type="date"
            name="end_date"
            label="Fecha de finalización"
            value={formatDate(editedProject.end_date)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descripción"
            name="description"
            value={editedProject.description || ""}
            onChange={handleChange}
          />
        </div>
      </DialogContent>

      <DialogActions className="px-6 pb-4 flex justify-between">
        <Button onClick={onClose} variant="outlined" className="text-gray-600" >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
