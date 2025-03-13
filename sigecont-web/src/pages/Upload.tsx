// components/Upload.tsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { uploadTimeSheet } from '../api/uploadTimeSheet';
// Se não compartilhar o DTO da API, defina-o aqui manualmente:
export interface ResultadoCalculoDto {
  nomeFuncionario: string;
  totalHorasTrabalhadas: number;
  totalHorasExtras50: number;
  totalHorasExtras100: number;
  totalHorasNoturnas: number;
}

const allowedExtensions = ['xls', 'xlsx'];

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<ResultadoCalculoDto[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setFile(selectedFile);
      } else {
        setFile(null);
        setError(`Arquivo inválido. Extensões permitidas: ${allowedExtensions.join(', ')}`);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      try {
        const response = await uploadTimeSheet(file);
        // Supondo que a API retorne um array de ResultadoCalculoDto
        setResults(response);
      } catch (error) {
        console.error(error);
        setError('Erro ao enviar o arquivo.');
      }
    } else {
      setError(`Por favor, selecione um arquivo com as extensões permitidas: ${allowedExtensions.join(', ')}`);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload de Excel
        </Typography>
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            inputProps={{ accept: '.xls,.xlsx' }}
            onChange={handleFileChange}
          />
          <Button type="submit" variant="contained" sx={{ ml: 2 }}>
            Enviar
          </Button>
        </form>
        {error && (
          <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
            {error}
          </Typography>
        )}
        {results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            {results.map((result, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="h6">{result.nomeFuncionario}</Typography>
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
                  Horas Noturnas: {result.totalHorasNoturnas.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Upload;
