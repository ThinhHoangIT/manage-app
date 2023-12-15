import React, { useState } from "react";
import styled from "styled-components";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import {
  boardMemberRemove,
  boardRoleMemberChange,
} from "../../../../../Services/boardService";
import { openAlert } from "../../../../../Redux/Slices/alertSlice";
const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

export const Title = styled.div`
  color: #5e6c84;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MemberInBoardWrapper = styled.div`
  width: 100%;
  background-color: transparent;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  height: 2rem;
  align-items: center;
  position: relative;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const IconWrapper = styled.div`
  width: fit-content;
  cursor: pointer;
  height: fit-content;
  position: relative;
`;

const MemberName = styled.div``;

export const USER_ROLES = ["owner", "manager", "member"];

const MemberInBoard = (props) => {
  const dispatch = useDispatch();
  const boardId = useSelector((state) => state.board.id);
  const currentUserId = useSelector((state) => state.user.userInfo._id);
  const members = useSelector((state) => state.board.members);
  const currentUserRole = members.find(
    (member) => member.user === currentUserId
  )?.role;

  console.log(currentUserId);

  const [open, setOpen] = useState(false);

  let isOwner = props.role === "owner";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async (e) => {
    await boardRoleMemberChange(boardId, props.user, e.target.value, dispatch);
  };

  console.log(props);

  const handleClick = async () => {
    if (isOwner) {
      dispatch(
        openAlert({
          message: "Can not remove owner of board",
          severity: "warning",
        })
      );
      return;
    }
    await boardMemberRemove(boardId, props.user, dispatch);
    setOpen(false);
  };

  return (
    <MemberInBoardWrapper>
      <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: props.color,
          fontSize: "0.875rem",
          fontWeight: "800",
        }}
      >
        {props.name[0].toUpperCase()}
      </Avatar>
      <MemberName>{props.name}</MemberName>
      <FormControl sx={{ m: 2, minWidth: 100 }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          defaultValue={props.role}
          displayEmpty
          onChange={handleChange}
          disabled={currentUserRole !== "owner"} // chỉ owner mới có thể thay đổi role
        >
          {USER_ROLES.map((role) => (
            <MenuItem value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconWrapper
        onClick={handleClickOpen}
        style={{
          display:
            currentUserRole === "owner" || currentUserRole === "manager"
              ? "block"
              : "none",
        }}
      >
        <DeleteOutlineOutlinedIcon fontSize="1rem" />
      </IconWrapper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to remove ${props.name} from the board?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to remove this member? This action can
            not undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </MemberInBoardWrapper>
  );
};

const MembersPopoverInBoard = () => {
  const members = useSelector((state) => state.board.members);
  return (
    <Container>
      <Title>Board members</Title>
      {members.map((member) => {
        return <MemberInBoard key={member.user} {...member} />;
      })}
    </Container>
  );
};

export default MembersPopoverInBoard;
