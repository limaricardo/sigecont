import { Box, Paper, styled } from '@mui/material';

export const PageShell = styled(Box)(() => ({
  minHeight: 'calc(100vh - 6vh)',
  paddingTop: '8vh',
  paddingBottom: '4vh',
  background:
    'radial-gradient(circle at top left, rgba(211, 47, 47, 0.12), transparent 32%), linear-gradient(180deg, #fafafa 0%, #f3f4f6 100%)',
}));

export const ContentCard = styled(Paper)(() => ({
  width: '100%',
  maxWidth: 860,
  margin: '0 auto',
  padding: '32px',
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 18px 50px rgba(15, 23, 42, 0.12)',
}));

export const ResultPanel = styled(Box)(() => ({
  borderRadius: 20,
  padding: '24px',
  background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.08), rgba(15, 23, 42, 0.04))',
  border: '1px solid rgba(211, 47, 47, 0.14)',
}));