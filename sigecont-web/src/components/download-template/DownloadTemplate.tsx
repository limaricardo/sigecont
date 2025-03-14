import styled from 'styled-components';

// Container centralizado na tela
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

// Botão estilizado para download
const DownloadButton = styled.a`
  display: inline-block;
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DownloadTemplate = () => {
  return (
    <Container>
      <DownloadButton href="/assets/templates/template_folha.xlsx" download>
        Baixar Template de Excel
      </DownloadButton>
    </Container>
  );
};

export default DownloadTemplate;
