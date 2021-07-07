import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";
import React from "react";

const InfoStyle = styled.div`
  .infoBox {
    flex: 1;
    cursor: pointer;
  }

  .infoBox:not(:last-child) {
    margin-right: 10px;
  }

  .infoBox--selected {
    border-top: 10px solid greenyellow;
  }

  .infoBox--red {
    border-color: red;
  }

  .infoBox__cases--green {
    color: lightgreen !important;
  }

  .infoBox__cases {
    color: #cc1034;
    font-weight: 600;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .infoBox__total {
    color: "#CC1034";
    font-weight: 700 !important;
    font-size: 0.8rem !important;
    margin-top: 15px !important;
  }
`;

function InfoBox({ title, isRed, isGray, active, cases, total, ...props }) {
  return (
    <InfoStyle>
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${
          isRed && "infoBox--red"
        } 
        `}
      >
        <CardContent>
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
            {cases}
          </h2>
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </InfoStyle>
  );
}

export default InfoBox;
