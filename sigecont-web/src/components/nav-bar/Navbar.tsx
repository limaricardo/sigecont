import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: '6vh',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
}));

const Navbar: React.FC = () => {
    return (
        <StyledAppBar position="fixed">
            <Toolbar sx={{ minHeight: '6vh', px: 2 }}>
                {/* Logo à esquerda */}
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '100%', maxHeight: '6vh' }} />
                </Box>
                {/* Botões de navegação */}
                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/upload">
                    Upload Excel
                </Button>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;
