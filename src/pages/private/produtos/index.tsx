import React from "react";

import { useAuth } from "../../../hook/authenticator";

function ProdutosPage() {
  const { signOut } = useAuth();

  const sair = async () => {
    signOut();
  };

  return (
    <>
      <h1>ProdutosPage</h1>
      <button onClick={sair}>Sair</button>
    </>
  );
}

export { ProdutosPage };
