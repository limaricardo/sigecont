import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Home: React.FC = () => {
    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Página Inicial
                </Typography>
                <Typography variant="body1">
                    Bem-vindo ao sistema de cálculo de folha de ponto!
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
