import { Card, Col, Row } from "react-bootstrap";
import type { Info } from "../types/info";

// Algorithm info component to display info on the algorithms.
// takes in props "info" which is a type defined in types.
// since we have sorting and traversal algorithms we can use this
// to load in on each page without having to rewrite this
const AlgorithmInfo: React.FC<{ info: Info[] }> = ({ info }) => (
  <Row>
    {info.map((info, index) => (
      <Col md={6} key={index} className="mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Body>
            <Card.Title>{info.name}</Card.Title>
            <Card.Text>{info.description}</Card.Text>
            {info.link && (
              <Card.Link
                href={info.link}
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
