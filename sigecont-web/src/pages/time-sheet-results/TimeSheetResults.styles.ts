// TimeSheetResults.styles.tsx
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const ResultsWrapper = styled(Container)`
  display: flex;
  min-height: 90vh;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 0;
  margin-top: 60px;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center;
`;

export const ResultCard = styled(Box)`
  width: 30%;
  max-width: 600px;
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
`;

export const BackButton = styled(Button)`
  margin-top: 32px;
`;
