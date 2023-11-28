import React from "react";
import styled from "styled-components";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import {
  checklistItemMemberAdd,
  checklistItemMemberDelete,
} from "../../../../../Services/cardService";
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

const MemberWrapper = styled.div`
  width: 100%;
  background-color: transparent;
  border-radius: 3px;
  cursor: pointer;
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
  height: fit-content;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

const MemberName = styled.div``;

const MemberComponent = (props) => {
  const dispatch = useDispatch();
  const { member, membersItem } = props;

  const card = useSelector((state) => state.card);
  const membersInChecklist = membersItem.members;

  const isMember = card.members?.filter((m) =>
    membersInChecklist?.some(
      (item) => item.user === m.user && item.user === member.user
    )
  ).length
    ? true
    : false;
  const handleClick = async () => {
    if (isMember) {
      await checklistItemMemberDelete(
        card.cardId,
        card.listId,
        card.boardId,
        membersItem.checklistId,
        membersItem._id,
        member.user,
        dispatch
      );
    } else {
      await checklistItemMemberAdd(
        card.cardId,
        card.listId,
        card.boardId,
        membersItem.checklistId,
        membersItem._id,
        member.user,
        member.name,
        member.color,
        dispatch
      );
    }
  };

  return (
    <MemberWrapper onClick={handleClick}>
      <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: member.color,
          fontSize: "0.875rem",
          fontWeight: "800",
        }}
      >
        {member.name[0].toUpperCase()}
      </Avatar>
      <MemberName>{member.name}</MemberName>
      {isMember && (
        <IconWrapper>
          <DoneIcon fontSize="1rem" />
        </IconWrapper>
      )}
    </MemberWrapper>
  );
};

const MembersPopoverInCheckListItem = (props) => {
  const members = useSelector((state) => state.card.members);
  return (
    <Container>
      <Title>Members in Card</Title>
      {members.map((member) => {
        return (
          <MemberComponent
            key={member.user}
            member={member}
            membersItem={props.props}
          />
        );
      })}
    </Container>
  );
};

export default MembersPopoverInCheckListItem;
