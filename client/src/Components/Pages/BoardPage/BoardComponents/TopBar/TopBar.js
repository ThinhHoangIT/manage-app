import React, { useEffect, useState } from "react";
import * as style from "./styled";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as common from "../../CommonStyled";
import { useDispatch, useSelector } from "react-redux";
import { boardTitleUpdate } from "../../../../../Services/boardsService";
import RightDrawer from "../../../../Drawers/RightDrawer/RightDrawer";
import BasePopover from "../../../../Modals/EditCardModal/ReUsableComponents/BasePopover";
import InviteMembers from "../../../../Modals/EditCardModal/Popovers/InviteMembers/InviteMembers";
import MembersPopoverInBoard from "../../../../Modals/EditCardModal/Popovers/Members/MembersPopoverInBoard";

const TopBar = () => {
  const board = useSelector((state) => state.board);
  const [currentTitle, setCurrentTitle] = useState(board.title);
  const [showDrawer, setShowDrawer] = useState(false);
  const [memberPopover, setMemberPopover] = React.useState(null);
  const [invitePopover, setInvitePopover] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!board.loading) setCurrentTitle(board.title);
  }, [board.loading, board.title]);
  const handleTitleChange = () => {
    boardTitleUpdate(currentTitle, board.id, dispatch);
  };
  return (
    <style.TopBar>
      <style.LeftWrapper>
        <style.InviteButton
          onClick={(event) => setInvitePopover(event.currentTarget)}
        >
          <PersonAddAltIcon />
          <style.TextSpan>Add Member</style.TextSpan>
        </style.InviteButton>
        {invitePopover && (
          <BasePopover
            anchorElement={invitePopover}
            closeCallback={() => {
              setInvitePopover(null);
            }}
            title="Invite Members"
            contents={
              <InviteMembers
                closeCallback={() => {
                  setInvitePopover(null);
                }}
              />
            }
          />
        )}

        <style.BoardNameInput
          placeholder="Board Name"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={handleTitleChange}
        />
      </style.LeftWrapper>

      <style.RightWrapper>
        <common.Button
          onClick={(event) => setMemberPopover(event.currentTarget)}
        >
          <style.TextSpan>Members</style.TextSpan>
          <MoreHorizIcon />
        </common.Button>
        {memberPopover && (
          <BasePopover
            anchorElement={memberPopover}
            closeCallback={() => {
              setMemberPopover(null);
            }}
            title="Members"
            contents={<MembersPopoverInBoard />}
          />
        )}
        <common.Button
          marginLeft={"5px"}
          onClick={() => {
            setShowDrawer(true);
          }}
        >
          <style.TextSpan>Show menu</style.TextSpan>
          <MoreHorizIcon />
        </common.Button>
      </style.RightWrapper>
      <RightDrawer
        show={showDrawer}
        closeCallback={() => {
          setShowDrawer(false);
        }}
      />
    </style.TopBar>
  );
};

export default TopBar;
