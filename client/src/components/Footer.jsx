import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="custom-footer mt-auto">
      <Container>
        <div className="text-center py-3">
          <p className="mb-0 text-muted">
            © 2025 My Contact Book App. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;