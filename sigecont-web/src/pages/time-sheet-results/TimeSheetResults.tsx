// TimeSheetResults.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ResultsWrapper, Title, ResultCard, BackButton } from './TimeSheetResults.styles';
import { ResultadoCalculoDto } from '../upload-time-sheet/UploadTimeSheet';

const TimeSheetResults: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Access the results from the router state
    const { results } = (location.state as { results?: ResultadoCalculoDto[] }) || {};

    // If no results exist (e.g., direct navigation), redirect back to upload
    if (!results) {
        return (
            <ResultsWrapper>
                <Typography variant="h5">Nenhum resultado disponível.</Typography>
                <BackButton variant="contained" onClick={() => navigate('/upload')}>
                    Voltar para Upload
                </BackButton>
            </ResultsWrapper>
        );
    }

    return (
        <ResultsWrapper>
            <Title>Resultados do Cálculo</Title>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '70vw'}}>
                {results.map((result, index) => (
                    <ResultCard key={index}>
                        <Typography variant="h5" mb={2}>{result.nomeFuncionario}</Typography>
                        <Typography>
                            Horas Trabalhadas: {result.totalHorasTrabalhadas.toFixed(2)}
                        </Typography>
                        <Typography>
                            Horas Extras 50%: {result.totalHorasExtras50.toFixed(2)}
                        </Typography>
                        <Typography>
                            Horas Extras 100%: {result.totalHorasExtras100.toFixed(2)}
                        </Typography>
                        <Typography>
                            Horas Noturnas: {result.totalHorasNoturnasFormatado}
                        </Typography>
                    </ResultCard>
                ))}
            </Box>
            <BackButton variant="contained" onClick={() => navigate('/upload')}>
                Voltar para Upload
            </BackButton>
        </ResultsWrapper>
    );
};

export default TimeSheetResults;
