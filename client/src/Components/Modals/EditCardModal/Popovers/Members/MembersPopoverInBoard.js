import React from "react";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
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
  gap: 0.5rem;
  height: 2rem;
  align-items: center;
  padding: 0.5rem;
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const IconWrapper = styled.div`
  width: fit-content;
  cursor: pointer;
  height: fit-content;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

const MemberName = styled.div``;

const MemberInBoard = (props) => {
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
      <IconWrapper>
        <DeleteForeverOutlinedIcon fontSize="1rem" />
      </IconWrapper>
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
