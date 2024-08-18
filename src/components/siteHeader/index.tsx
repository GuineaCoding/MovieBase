import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, Typography, IconButton, Button, MenuItem, Menu, Select, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLanguage } from "../../components/language";
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../../supbase';

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
interface LanguageContextType {
  language: string;
  switchLanguage: (lang: string) => void;
}
const styles = {
  title: {
    flexGrow: 1,
  },
  languageSelector: {
    color: 'white',
  },
  selectionsSelector: {
    color: 'white',
    marginLeft: '10px',
  }
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { language, switchLanguage } = useLanguage();
  const [session, setSession] = useState(null);
  const [selection, setSelection] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        setSession(session);
        console.log("Session checked on load:", session);
      } catch (error) {
        console.error("Error getting session:", error);
      }

      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
      });

      return () => listener.subscription.unsubscribe();
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error);
    } else {
      setSession(null);
      navigate("/signin");
    }
  };

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
  ];

  const selectionsMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Genres", path: "/genres" },
    { label: "Popular Movies", path: "/popular" },
    { label: "Actors", path: "/actors" },
    { label: "TV Series", path: "/tvseries" },
    { label: "Favorites", path: "/favorites" }
  ];

  const languages = [
    { code: 'en-US', label: 'English' },
    { code: 'es-ES', label: 'Español' },
    { code: 'fr-FR', label: 'Français' },
    { code: 'de-DE', label: 'Deutsch' }
  ];

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            MOVIEBASE
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          <Select
            value={language}
            onChange={(e) => switchLanguage(e.target.value as string)}
            sx={styles.languageSelector}
          >
            {languages.map(lang => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
<Select
  value={selection}
  onChange={(e) => {
    setSelection(e.target.value as string);
    navigate(e.target.value as string);
  }}
  displayEmpty
  sx={styles.selectionsSelector}
>
  <MenuItem value="" disabled>
    Selections
  </MenuItem>
  {selectionsMenuOptions.map(option => (
    <MenuItem key={option.label} value={option.path}>
      {option.label}
    </MenuItem>
  ))}
</Select>
          {!session ? (
            <>
              <Button color="inherit" onClick={() => navigate("/signin")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => navigate(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            menuOptions.map((opt) => (
              <Button key={opt.label} color="inherit" onClick={() => navigate(opt.path)}>
                {opt.label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
