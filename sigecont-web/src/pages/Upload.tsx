// components/Upload.tsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const allowedExtensions = ['xls', 'xlsx'];

const Upload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            // Aqui você pode implementar o envio do arquivo para o servidor ou processá-lo conforme necessário
            console.log('Arquivo selecionado:', file.name);
            alert('Arquivo enviado com sucesso!');
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
            </Box>
        </Container>
    );
};

export default Upload;
