function NotFound() {
  return (
    <div className="mainContainer">
      <div className="centerWrapper">
        <img src="/404not_found.jpg" alt="Not Found" />
        <h2>
          Oh oh!, parece que la página que estás intentando ver no está
          disponible
        </h2>
        <a href="/">Volver al inicio</a>
      </div>
    </div>
  );
}

export default NotFound;
