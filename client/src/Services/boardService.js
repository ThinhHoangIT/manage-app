import axios from "axios";
import {
  setLoading,
  successCreatingList,
  successDeletingList,
  successFetchingLists,
  updateListTitle,
} from "../Redux/Slices/listSlice";
import { openAlert } from "../Redux/Slices/alertSlice";
import {
  addMembers,
  removeMember,
  setActivityLoading,
  updateActivity,
  updateBackground,
  updateDescription,
  changeRoleMember,
} from "../Redux/Slices/boardSlice";

const listRoute = "https://trello.cyclic.app/list";
const boardRoute = "https://trello.cyclic.app/board";
let submitCall = Promise.resolve();

export const getLists = async (boardId, dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(listRoute + "/" + boardId);
    dispatch(successFetchingLists(res.data));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 300);
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const activityUpdate = async (boardId, dispatch) => {
  dispatch(setActivityLoading(true));
  try {
    const res = await axios.get(boardRoute + "/" + boardId + "/activity");
    dispatch(updateActivity(res.data));
    dispatch(setActivityLoading(false));
  } catch (error) {
    dispatch(setActivityLoading(false));
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const createList = async (title, boardId, dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(listRoute + "/create", {
      title: title,
      boardId: boardId,
    });
    dispatch(successCreatingList(res.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const DeleteList = async (listId, boardId, dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(listRoute + "/" + boardId + "/" + listId);
    await dispatch(successDeletingList(listId));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const listTitleUpdate = async (listId, boardId, title, dispatch) => {
  try {
    await dispatch(updateListTitle({ listId: listId, title: title }));
    await axios.put(
      listRoute + "/" + boardId + "/" + listId + "/update-title",
      { title: title }
    );
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const boardDescriptionUpdate = async (
  boardId,
  description,
  dispatch
) => {
  try {
    await dispatch(updateDescription(description));
    await axios.put(`${boardRoute}/${boardId}/update-board-description`, {
      description,
    });
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const boardBackgroundUpdate = async (
  boardId,
  background,
  isImage,
  dispatch
) => {
  try {
    await dispatch(updateBackground({ background, isImage }));
    await axios.put(`${boardRoute}/${boardId}/update-background`, {
      background,
      isImage,
    });
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const boardMemberAdd = async (boardId, members, dispatch) => {
  try {
    const result = await axios.post(`${boardRoute}/${boardId}/add-member`, {
      members,
    });
    await dispatch(addMembers(result.data));
    dispatch(
      openAlert({
        message: "Members are added to this board successfully",
        severity: "success",
      })
    );
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const boardMemberRemove = async (boardId, memberId, dispatch) => {
  try {
    dispatch(removeMember({ memberId }));
    submitCall = submitCall.then(() =>
      axios.delete(
        boardRoute + "/" + boardId + "/" + memberId + "/remove-member"
      )
    );
    await submitCall;
    dispatch(
      openAlert({
        message: "Members are removed to this board successfully",
        severity: "success",
      })
    );
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const boardRoleMemberChange = async (
  boardId,
  memberId,
  role,
  dispatch
) => {
  try {
    dispatch(changeRoleMember({ memberId, role }));
    submitCall = submitCall.then(() =>
      axios.put(
        boardRoute + "/" + boardId + "/" + memberId + "/change-role-member",
        {
          role: role,
        }
      )
    );
    await submitCall;
    dispatch(
      openAlert({
        message: "Change member's role successfully",
        severity: "success",
      })
    );
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};
