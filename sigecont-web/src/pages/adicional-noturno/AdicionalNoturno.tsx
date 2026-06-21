import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { calcularAdicionalNoturno, CalculoAdicionalNoturnoResponse } from '../../api/adicionalNoturno';
import { ContentCard, PageShell, ResultPanel } from './AdicionalNoturno.styles';

const timePattern = /^\d+:[0-5]\d$/;

const AdicionalNoturno: React.FC = () => {
  const [horasSemAdicional, setHorasSemAdicional] = useState('');
  const [horasNoturnas, setHorasNoturnas] = useState('');
  const [resultado, setResultado] = useState<CalculoAdicionalNoturnoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const inputsPreenchidos = useMemo(
    () => horasSemAdicional.trim().length > 0 && horasNoturnas.trim().length > 0,
    [horasSemAdicional, horasNoturnas],
  );

  useEffect(() => {
    if (!inputsPreenchidos) {
      setResultado(null);
      setMessage('');
      setLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const valorSemAdicional = horasSemAdicional.trim();
      const valorNoturno = horasNoturnas.trim();

      if (!timePattern.test(valorSemAdicional)) {
        setResultado(null);
        setMessage('Informe as horas trabalhadas sem adicional noturno no formato horas:minutos, como 5:03.');
        return;
      }

      if (!timePattern.test(valorNoturno)) {
        setResultado(null);
        setMessage('Informe as horas noturnas no formato horas:minutos, como 2:00.');
        return;
      }

      try {
        setLoading(true);
        setMessage('');
        const response = await calcularAdicionalNoturno({
          horasTrabalhadasSemAdicionalNoturno: valorSemAdicional,
          horasNoturnas: valorNoturno,
        });

        setResultado(response);
      } catch (error) {
        setResultado(null);
        setMessage(error instanceof Error ? error.message : 'Não foi possível calcular o adicional noturno.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [horasNoturnas, horasSemAdicional, inputsPreenchidos]);

  return (
    <PageShell>
      <Container maxWidth="md">
        <ContentCard elevation={0}>
          <Typography variant="overline" sx={{ color: '#b71c1c', fontWeight: 700, letterSpacing: 1.2 }}>
            Novo cálculo
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
            Adicional noturno
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 720 }}>
            Informe as horas trabalhadas sem adicional noturno e as horas noturnas para obter o total calculado pela regra já existente no backend.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Horas trabalhadas sem adicional noturno"
                value={horasSemAdicional}
                onChange={(event) => setHorasSemAdicional(event.target.value)}
                placeholder="5:03"
                helperText="Use o formato horas:minutos"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Horas noturnas"
                value={horasNoturnas}
                onChange={(event) => setHorasNoturnas(event.target.value)}
                placeholder="2:00"
                helperText="Use o formato horas:minutos"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                <CircularProgress size={20} />
                <Typography variant="body2">Calculando adicional noturno...</Typography>
              </Box>
            )}

            {!loading && message && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            {!loading && resultado && (
              <ResultPanel>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Resultado do cálculo
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Horas sem adicional
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {resultado.horasTrabalhadasSemAdicionalNoturno}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Horas noturnas informadas
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {resultado.horasNoturnas}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Horas noturnas com adicional
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {resultado.horasNoturnasConvertidas}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total final
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#b71c1c' }}>
                      {resultado.totalFinal}
                    </Typography>
                  </Grid>
                </Grid>
              </ResultPanel>
            )}
          </Box>

          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary">
            A conversão do adicional noturno é executada no backend usando a regra já existente no sistema.
          </Typography>
        </ContentCard>
      </Container>
    </PageShell>
  );
};

export default AdicionalNoturno;