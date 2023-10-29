import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';

function ReportCard2() {
  const { id_to_transfer } = useParams();
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate(`/PageHR/${id_to_transfer}/ReportGenaration/Report2`);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-center">Employee Report</Card.Title>
        <Card.Text>Generate a report based on the employee records grouped by job title, department, pay grade.</Card.Text>
        <Button variant="primary" onClick={handleGenerateReport}>Generate Report</Button>
      </Card.Body>
    </Card>
  );
}

export default ReportCard2;
