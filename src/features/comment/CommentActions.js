import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import ConfirmationDialogRaw from "../../components/ConfirmationDialogRaw";
import { deleteComment } from "./commentSlice";

function CommentActions({ commentId }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    setOpenModal(true);
  };

  // Receive cancelled or confirmed from modal
  const handleCloseModal = (value) => {
    setOpenModal(false);
    if (value === "confirmed") {
      // Start delete action
      console.log(`Start delete comment`, commentId, user._id);
      dispatch(deleteComment({ commentId, currentUserId: user._id }));
    }
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Delete
      </Button>
      {openModal && (
        <ConfirmationDialogRaw
          keepMounted
          open={openModal}
          onClose={handleCloseModal}
          type="deleteComment"
          message="Are you sure you want to delete this comment?"
        />
      )}
    </>
  );
}

export default CommentActions;
