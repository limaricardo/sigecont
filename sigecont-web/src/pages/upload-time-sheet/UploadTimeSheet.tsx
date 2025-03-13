// UploadTimeSheet.tsx
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';
import { uploadTimeSheet } from '../../api/uploadTimeSheet';

export interface ResultadoCalculoDto {
  nomeFuncionario: string;
  totalHorasTrabalhadas: number;
  totalHorasExtras50: number;
  totalHorasExtras100: number;
  totalHorasNoturnas: number;
}

const UploadTimeSheet: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Por favor, selecione ou arraste pelo menos um arquivo Excel.');
      return;
    }

    try {
      setLoading(true);
      const response = await uploadTimeSheet(files);
      // Navigate to the results page, passing data via state
      navigate('/results', { state: { results: response } });
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar o arquivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', width: '100vw', minHeight: '90vh' }}>
      {/* Main content */}
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
          Upload de Excel
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mb: 4 }}>
          Mescle ou carregue seus arquivos Excel de maneira fácil e rápida.
          Arraste e solte ou clique para selecionar seus arquivos.
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            p: 4,
            width: '100%',
            maxWidth: 600,
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragActive ? '#fff0f0' : '#fff',
            transition: 'border-color 0.2s ease',
            mb: 2,
            '&:hover': {
              borderColor: '#d32f2f',
            },
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant="body2">Solte os arquivos aqui...</Typography>
          ) : (
            <Typography variant="body2">
              Arraste e solte os arquivos aqui, ou clique para selecionar
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="error"
          onClick={handleUpload}
          disabled={loading}
          sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1rem', borderRadius: '8px' }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>

        {files.length > 0 && (
          <Box sx={{ mt: 3, textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Arquivos selecionados:
            </Typography>
            {files.map((file, idx) => (
              <Typography key={idx} variant="body2">
                {file.name}
              </Typography>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UploadTimeSheet;
