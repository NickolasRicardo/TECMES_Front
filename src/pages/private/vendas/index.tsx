import React from "react";

import { useAuth } from "../../../hook/authenticator";

function VendasPage() {
  const { signOut } = useAuth();

  const sair = async () => {
    signOut();
  };

  return (
    <>
      <h1>VendasPage</h1>
      <button onClick={sair}>Sair</button>
    </>
  );
}

export { VendasPage };
