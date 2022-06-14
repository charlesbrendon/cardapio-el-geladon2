import "./Overlay.css";

const Overlay = ({ children, overlayClick }) => {
  return (
    <div className="Overlay" onClick={() => overlayClick()}>
      {children}
    </div>
  );
};

export default Overlay;
