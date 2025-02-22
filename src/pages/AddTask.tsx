import { Category, Task, UserProps } from "../types/user";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddTaskButton, Container } from "../styles";
import { Edit } from "@mui/icons-material";

import { Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { DESCRIPTION_MAX_LENGTH, TASK_NAME_MAX_LENGTH } from "../constants";
import { CategorySelect, TopBar } from "../components";
import { CustomEmojiPicker } from "../components";

export const AddTask = ({ user, setUser }: UserProps) => {
  const [name, setName] = useState<string>("");
  const [emoji, setEmoji] = useState<string | undefined>();
  const [color, setColor] = useState<string>("#b624ff");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const n = useNavigate();

  useEffect(() => {
    document.title = "Jadwal Harian - Add Task";
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.length > TASK_NAME_MAX_LENGTH) {
      setNameError(`Nama Tidak Boleh Kurang Dari ${TASK_NAME_MAX_LENGTH} characters`);
    } else {
      setNameError("");
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    if (newDescription.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(
        `Diskripksi Tidak Boleh Kurang Dari ${DESCRIPTION_MAX_LENGTH} characters`
      );
    } else {
      setDescriptionError("");
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  const handleAddTask = () => {
    if (name !== "") {
      if (name.length > TASK_NAME_MAX_LENGTH || description.length > DESCRIPTION_MAX_LENGTH) {
        return; // Do not add the task if the name or description exceeds the maximum length
      }

      const newTask: Task = {
        id: new Date().getTime() + Math.random(),
        done: false,
        pinned: false,
        name,
        description: description !== "" ? description : undefined,
        emoji: emoji ? emoji : undefined,
        color,
        date: new Date(),
        deadline: deadline !== "" ? new Date(deadline) : undefined,
        category: selectedCategories ? selectedCategories : [],
      };
      setUser({ ...user, tasks: [...user.tasks, newTask] });
      n("/");
    }
  };

  return (
    <>
      <TopBar title="Tambah Tugas Baru" />
      <Container>
        <CustomEmojiPicker user={user} setEmoji={setEmoji} color={color} />
        <StyledInput
          label="Nama Tugas/Jadwal"
          name="name"
          placeholder="Masukkan Nama Tugas/Jadwal"
          value={name}
          onChange={handleNameChange}
          focused
          error={nameError !== ""}
          helperText={nameError}
        />
        <StyledInput
          label="Keterangan Tugas"
          name="name"
          placeholder="Tulis catatan tentang tugas anda"
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
          focused
          error={descriptionError !== ""}
          helperText={descriptionError}
        />
        <StyledInput
          label="Jadwal"
          name="nama"
          placeholder="Masukkan Tanggal Deadline"
          type="datetime-local"
          value={deadline}
          onChange={handleDeadlineChange}
          focused
        />
        {user.settings[0].enableCategories !== undefined && user.settings[0].enableCategories && (
          <>
            <br />
            <Typography>Jenis Tugas</Typography>

            <CategorySelect
              user={user}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              width="400px"
            />
            <Link to="/categories">
              <Button
                sx={{
                  margin: "8px 0 24px 0 ",
                  padding: "12px 24px",
                  borderRadius: "12px",
                }}
                // onClick={() => n("/categories")}
              >
                <Edit /> &nbsp; Kustom Categories
              </Button>
            </Link>
          </>
        )}
        <Typography>Warna</Typography>
        <ColorPicker type="color" value={color} onChange={handleColorChange} />
        <AddTaskButton
          onClick={handleAddTask}
          disabled={
            name.length > TASK_NAME_MAX_LENGTH ||
            description.length > DESCRIPTION_MAX_LENGTH ||
            name === ""
          }
        >
          Tambahkan Tugas
        </AddTaskButton>
      </Container>
    </>
  );
};
const StyledInput = styled(TextField)`
  margin: 12px;
  .MuiOutlinedInput-root {
    border-radius: 16px;
    transition: 0.3s all;
    width: 400px;
    color: white;
  }
`;

const ColorPicker = styled.input`
  width: 400px;
  margin: 12px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #ffffff3e;
  &::-webkit-color-swatch {
    border-radius: 100px;
    border: none;
  }
`;
