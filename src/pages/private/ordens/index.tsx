import React from "react";

import { useAuth } from "../../../hook/authenticator";
import * as S from "./styles";
import { Row, Col } from "antd";
function OrdensPage() {
  return (
    <S.Container>
      <Row style={{ width: "100%" }}>
        <Col span={12}>
          <h1>Filmes</h1>
        </Col>
        <Col span={6} style={{ width: "100%" }}></Col>
        <Col span={6}>
          <S.ButtonCss onClick={() => console.log("oi")}>
            Lista de compras
          </S.ButtonCss>
        </Col>
        <Col span={24}></Col>
      </Row>
      <div style={{ flex: 1 }}></div>
    </S.Container>
  );
}

export { OrdensPage };
