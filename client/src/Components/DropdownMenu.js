import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import styledComponent from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getBoards } from "../Services/boardsService";
import CardLoadingSvg from "../Images/cardLoading.svg";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  gap: "0.25rem",
  padding: "0.25rem 0.5rem",
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  "&:active": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

const LoadingBox = styledComponent.div`
	height: 3rem;
	width: 8rem;
	padding: 0.5rem 3rem;
	background-image: url(${(props) => props.image});
	background-position: center;
	background-repeat: no-repeat;
`;

const Span = styledComponent.span`
font-size: 0.85rem;
display:block;
`;

const StyledIcon = styled(DownIcon)({
  display: "block",
  fontSize: "1.3rem",
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DropdownMenu(props) {
  const boardsData = useSelector((state) => state.boards.boardsData);
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    setLoading(true);
    await getBoards(true, dispatch);
    setLoading(false);
  };

  /* 	React.useEffect(() => {
		if (!Object.keys(boardsData).length) getBoards(dispatch);
	}, []); */

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <BootstrapButton
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Span>{props.title}</Span>
        <Span>
          <StyledIcon />
        </Span>
      </BootstrapButton>
      {Object.keys(boardsData).length > 0 && (
        <StyledMenu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          //   anchorOrigin={{
          //     vertical: "bottom",
          //     horizontal: "left",
          //   }}
          //   transformOrigin={{
          //     vertical: "top",
          //     horizontal: "left",
          //   }}
        >
          {!loading ? (
            boardsData.map((item) => {
              return (
                <MenuItem
                  key={item._id}
                  onClick={() => {
                    setAnchorEl(null);
                    history.push("/board/" + item._id);
                  }}
                >
                  <Span>{item.title}</Span>
                </MenuItem>
              );
            })
          ) : (
            <LoadingBox image={CardLoadingSvg} />
          )}
        </StyledMenu>
      )}
    </div>
  );
}
