const PaletaContext = {
  paletaEndpoint: () => `${Api.baseUrl}/paletas`,
  paletaLista: () => `${PaletaContext.paletaEndpoint()}/listar-paletas`,
  paletaById: (id) => `${PaletaContext.paletaEndpoint()}/paleta/${id}`,
  createPaleta: () => `${PaletaContext.paletaEndpoint()}/criar-paleta`,
  updatePaletaById: (id) =>
    `${PaletaContext.paletaEndpoint()}/atualizar-paleta/${id}`,
  deletePaletaById: (id) =>
    `${PaletaContext.paletaEndpoint()}/excluir-paleta/${id}`,
};

const SacolaContext = {
  getSacola: () => `${PaletaContext.paletaEndpoint()}/all-carrinho`,
  createSacola: () => `${PaletaContext.paletaEndpoint()}/create-carrinho`,
  purchase: () => `${PaletaContext.paletaEndpoint()}/finish-carrinho`,
};

export const Api = {
  baseUrl: "http://localhost:3003",
  ...PaletaContext,
  ...SacolaContext,
};
