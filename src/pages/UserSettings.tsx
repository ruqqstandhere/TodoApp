import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { UserProps } from "../types/user";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AddAPhoto, Delete, Logout, Settings } from "@mui/icons-material";
import { PROFILE_PICTURE_MAX_LENGTH, USER_NAME_MAX_LENGTH } from "../constants";
import { SettingsDialog, TopBar } from "../components";
import { ColorPalette, DialogBtn } from "../styles";
import { defaultUser } from "../constants/defaultUser";

export const UserSettings = ({ user, setUser }: UserProps) => {
  const [name, setName] = useState<string>("");
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [openChangeImage, setOpenChangeImage] = useState<boolean>(false);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState<boolean>(false);

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  useEffect(() => {
    document.title = `Jadwal Harian - User ${user.name ? `(${user.name})` : ""}`;
  }, [user.name]);

  const handleSaveName = () => {
    setUser({ ...user, name: name });
    setName("");
  };

  const handleOpenImageDialog = () => {
    setOpenChangeImage(true);
  };
  const handleCloseImageDialog = () => {
    setOpenChangeImage(false);
  };

  const handleLogoutConfirmationClose = () => {
    setLogoutConfirmationOpen(false);
  };
  const handleLogout = () => {
    setUser(defaultUser);
    handleLogoutConfirmationClose();
  };
  return (
    <>
      <TopBar title="User Profile" />
      <Container>
        <IconButton
          onClick={() => setOpenSettings(true)}
          size="large"
          sx={{
            position: "absolute",
            top: "24px",
            right: "24px",
          }}
        >
          <Settings fontSize="large" />
        </IconButton>
        <Tooltip title={user.profilePicture ? "Ganti Foto Profil" : "Masukkan Foto Profil"}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                onClick={handleOpenImageDialog}
                sx={{
                  background: "#9c9c9c81",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                }}
              >
                <AddAPhoto />
              </Avatar>
            }
          >
            <Avatar
              onClick={handleOpenImageDialog}
              src={(user.profilePicture as string) || undefined}
              onError={() => {
                setUser({ ...user, profilePicture: null });
                throw new Error("Sepurane Link Gak KETEMU");
              }}
              sx={{
                width: "96px",
                height: "96px",
                cursor: "pointer",
              }}
            />
          </Badge>
        </Tooltip>
        <UserName>{user.name || "User"}</UserName>
        <Tooltip
          title={`Created at: ${new Date(user.createdAt).toLocaleDateString()} • ${new Date(
            user.createdAt
          ).toLocaleTimeString()}`}
        >
          <CreatedAtDate>
            Terdaftar Mulai {new Date(user.createdAt).toLocaleDateString()}
          </CreatedAtDate>
        </Tooltip>

        <StyledInput
          label={user.name === null ? "Masukkan Nama Anda" : "Ganti Nama"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
          error={name.length > USER_NAME_MAX_LENGTH}
          helperText={
            name.length > USER_NAME_MAX_LENGTH
              ? `Jenengmu Kedawan Cok! (maximum ${USER_NAME_MAX_LENGTH} karakter)`
              : ""
          }
        />

        <SaveBtn
          onClick={handleSaveName}
          disabled={name.length > USER_NAME_MAX_LENGTH || name === ""}
        >
          Simpan Nama
        </SaveBtn>

        <Button
          color="error"
          variant="outlined"
          sx={{ padding: "8px 20px", borderRadius: "14px", marginTop: "8px" }}
          onClick={() => setLogoutConfirmationOpen(true)}
        >
          <Logout />
          &nbsp; Logout
        </Button>
        <span>Design & Created By :</span>
        <Button
          color="primary"
          variant="outlined"
          sx={{ padding: "8px 20px", borderRadius: "14px", marginTop: "8px" }}
          onClick={() => (window.location.href = "https://www.instagram.com/ruqqnofearss_/")}
        >
          SADDSETTBOYZ
        </Button>
      </Container>
      <Dialog
        open={openChangeImage}
        onClose={handleCloseImageDialog}
        PaperProps={{
          style: { borderRadius: "24px", padding: "12px" },
        }}
      >
        <DialogTitle>Ganti Foto Profil</DialogTitle>
        <DialogContent>
          <StyledInput
            autoFocus
            label="Tulis Link Foto Profil"
            sx={{ margin: "8px 0" }}
            value={profilePictureURL}
            error={profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH}
            helperText={
              profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH
                ? `URL Kedawan maximum ${PROFILE_PICTURE_MAX_LENGTH} Karakter`
                : ""
            }
            onChange={(e) => {
              setProfilePictureURL(e.target.value);
            }}
          />
          <br />
          <Button
            onClick={() => {
              handleCloseImageDialog();
              setUser({ ...user, profilePicture: null });
            }}
            color="error"
            variant="outlined"
            sx={{ margin: "16px 0", padding: "8px 18px", borderRadius: "12px" }}
          >
            <Delete /> &nbsp; Hapus Gambar
          </Button>
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={handleCloseImageDialog}>Cancel</DialogBtn>
          <DialogBtn
            disabled={
              profilePictureURL.length > PROFILE_PICTURE_MAX_LENGTH ||
              !profilePictureURL.startsWith("https://")
            }
            onClick={() => {
              if (
                profilePictureURL.length <= PROFILE_PICTURE_MAX_LENGTH &&
                profilePictureURL.startsWith("https://")
              ) {
                handleCloseImageDialog();
                setUser({ ...user, profilePicture: profilePictureURL });
              }
            }}
          >
            Simpan
          </DialogBtn>
        </DialogActions>
      </Dialog>
      <Dialog
        open={logoutConfirmationOpen}
        onClose={handleLogoutConfirmationClose}
        PaperProps={{
          style: {
            borderRadius: "24px",
            padding: "10px",
          },
        }}
      >
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          Yakin koe te log out? <b>Tugas anda akan hilang.</b>
        </DialogContent>
        <DialogActions>
          <DialogBtn onClick={handleLogoutConfirmationClose}>Gasido</DialogBtn>
          <DialogBtn onClick={handleLogout} color="error">
            Aku Ngeyel!
          </DialogBtn>
        </DialogActions>
      </Dialog>
      <SettingsDialog
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        user={user}
        setUser={setUser}
      />
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: 64px 48px;
  border-radius: 48px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.25);
  background: #f5f5f5;
  color: ${ColorPalette.fontDark};
  border: 4px solid ${ColorPalette.purple};
  box-shadow: 0 0 18px 0 #b624ffbf;
  display: flex;
  gap: 14px;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledInput = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 16px;
    width: 300px;
  }
`;
const SaveBtn = styled(Button)`
  width: 300px;
  border: none;
  background: ${ColorPalette.purple};
  color: white;
  font-size: 18px;
  padding: 14px;
  border-radius: 16px;
  cursor: pointer;
  text-transform: capitalize;
  &:hover {
    background: ${ColorPalette.purple};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    color: white;
  }
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const CreatedAtDate = styled.span`
  font-style: italic;
  font-weight: 300;
  opacity: 0.8;
`;

// const Beta = styled.span`
//   background: #0e8e0e;
//   color: #00ff00;
//   font-size: 12px;
//   letter-spacing: 0.03em;
//   padding: 2px 6px;
//   border-radius: 5px;
//   font-weight: 600;
//   box-shadow: 0 0 4px 0 #0e8e0e91;
// `;
