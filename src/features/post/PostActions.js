import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialogRaw from "../../components/ConfirmationDialogRaw";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import useAuth from "../../hooks/useAuth";

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function PostActions({ postId }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  // Receive cancelled or confirmed from modal
  const handleCloseModal = (value) => {
    setOpenModal(false);
    if (value === "confirmed") {
      // Start delete action
      console.log(`Start delete post`, postId, user._id);
      dispatch(deletePost({ postId, currentUserId: user._id }));
    }
  };

  return (
    <>
      <IconButton
        id={`author-action-button-${postId}`}
        aria-controls={openMenu ? `author-action-menu-${postId}` : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        id={`author-action-menu-${postId}`}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `author-action-button-${postId}`,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon /> Delete post
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditIcon /> Edit post
        </MenuItem>
      </Menu>
      {openModal && (
        <ConfirmationDialogRaw
          keepMounted
          open={openModal}
          onClose={handleCloseModal}
          type="deletePost"
          message="Are you sure you want to delete this post?"
        />
      )}
    </>
  );
}

export default PostActions;
