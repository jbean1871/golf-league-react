import React from "react";
import { Col, Row } from "react-bootstrap";
import { useData } from "../contexts/DataContext";
import "../styles/teamHeader.css";

export default function TeamHeader(props) {
  const { userData, teamsData } = useData();
  const teamName = props.teamId;

  return (
    <>
      <Row className="spl_team-header">
        <Col className="spl_header-left">
          {teamsData[teamName].imageUrl ? (
            <img
              className="spl_team-image"
              src={teamsData[teamName].imageUrl}
            />
          ) : (
            ""
          )}
          <div className="spl_team-details">
            <h1 className="spl_team-name">{teamsData[teamName].members}</h1>
          </div>
        </Col>
      </Row>
    </>
  );
}
