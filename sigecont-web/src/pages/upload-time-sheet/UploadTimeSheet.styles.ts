// UploadTimeSheet.styles.ts
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const TopNavBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NavItems = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
`;

export const MainContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
`;

export const UploadBox = styled(Box)`
  background: #fff;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
  cursor: pointer;
  &:hover {
    border-color: #d32f2f;
  }
`;

export const BigRedButton = styled.button`
  background-color: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.25rem;
  padding: 16px 32px;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #b71c1c;
  }
`;
