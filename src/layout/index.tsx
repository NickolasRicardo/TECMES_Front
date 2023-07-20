import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "../router/path.routes";
import { Menu } from "antd";

import * as S from "./styles";
import { useAuth } from "../hook/authenticator";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState("");
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const { signOut } = useAuth();

  const sair = async () => {
    signOut();
  };

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[currentPath]}>
        {paths.map((path) => (
          <Menu.Item onClick={() => history.push(path.path)} key={path.path}>
            {path.name}
          </Menu.Item>
        ))}

        <Menu.Item onClick={() => sair()}>Logout</Menu.Item>
      </Menu>
      <S.Container>{children}</S.Container>
    </>
  );
};

export { Layout };
