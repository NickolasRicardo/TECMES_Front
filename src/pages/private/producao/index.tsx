import React from "react";

import { useAuth } from "../../../hook/authenticator";

function ProducaoPage() {
  const { signOut } = useAuth();

  const sair = async () => {
    signOut();
  };

  return (
    <>
      <h1>ProducaoPage</h1>
      <button onClick={sair}>Sair</button>
    </>
  );
}

export { ProducaoPage };
