import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { logoutAction } from "../redux/slices/userSlice";

const pages = ["books", "about"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [, setAnchorElUser] = useState(null);
  const [checked, setChecked] = useState(true);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setChecked(event.target.checked);
    handleChangeLanguage();
  };

  const { isUserLogin } = useSelector((state) => state.user);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <AppBar
      dir={currentLanguage === "en" ? "ltr" : "rtl"}
      position="static"
      sx={{ backgroundColor: "#0d1b2a", width: "100%" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuBookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("Book Store")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ textAlign: "center", textDecoration: "none" }}
                    color="inherit"
                    component={Link}
                    to={page}
                  >
                    {t(`${page}`)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MenuBookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("Book Store")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={`/${page}`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(`${page}`)}
              </Button>
            ))}
            {!isUserLogin && (
              <Button
                key={"loginPage"}
                onClick={handleCloseNavMenu}
                component={Link}
                to={`/login`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("login")}
              </Button>
            )}
            {!isUserLogin && (
              <Button
                key={"registerPage"}
                onClick={handleCloseNavMenu}
                component={Link}
                to={`/register`}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("register")}
              </Button>
            )}
            {isUserLogin && (
              <Button
                key={"logout"}
                onClick={() => dispatch(logoutAction())}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("logout")}
              </Button>
            )}
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                slotProps={{ input: { "aria-label": "change lang" } }}
              />
            }
            label={currentLanguage === "en" ? "ar" : "en"}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={"Open Setting"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="user menu"
                  {...stringAvatar("Marwan AbdAlMagied")}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
