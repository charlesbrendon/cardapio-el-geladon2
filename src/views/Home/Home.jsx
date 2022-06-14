import "./Home.css";
import PaletaList from "../../components/PaletaList/PaletaList";
import Navbar from "components/Navbar/navbar";
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import { useState } from "react";
import { ActionMode } from "components/constants/index";
import DeletaPaletaModal from "components/DeletarPaletaModal/DeletePaletaModal";
import SacolaModal from "components/SacolaModal/SacolaModal";
import { SacolaService } from "services/SacolaService";

const Home = () => {
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const [paletaParaEditar, setPaletaParaEditar] = useState();

  const [paletaParaDeletar, setPaletaParaDeletar] = useState();

  const [paletaEditada, setPaletaEditada] = useState();

  const [paletaRemovida, setPaletaRemovida] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const [canOpenBag, setCanOpenBag] = useState();

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  };

  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  const abrirSacola = async () => {
    const lista = JSON.parse(localStorage.getItem("sacola"));
    const sacola = lista.filter((i) => i.quantidade > 0);

    await SacolaService.create(sacola);

    setCanOpenBag(true);
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
        openBag={abrirSacola}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
      />
      <div className="Home__container">
        <PaletaList
          mode={modoAtual}
          paletaCriada={paletaParaAdicionar}
          paletaEditada={paletaEditada}
          paletaRemovida={paletaRemovida}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta}
        />
        {canShowAdicionaPaletaModal && (
          <AdicionaEditaPaletaModal
            mode={modoAtual}
            paletaToUpdate={paletaParaEditar}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
        {paletaParaDeletar && (
          <DeletaPaletaModal
            paletaParaDeletar={paletaParaDeletar}
            closeModal={handleCloseModal}
            onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
          />
        )}
        {canOpenBag && <SacolaModal closeModal={() => setCanOpenBag(false)} />}
      </div>
    </div>
  );
};

export default Home;
