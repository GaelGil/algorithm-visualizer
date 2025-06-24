import { Card, Col, Row } from "react-bootstrap";
import type { Info } from "../types/info";

const AlgorithmInfo: React.FC<{ items: Info[] }> = ({ items }) => (
  <Row>
    {items.map((item, index) => (
      <Col md={6} key={index} className="mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            {item.link && (
              <Card.Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </Card.Link>
            )}
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default AlgorithmInfo;
