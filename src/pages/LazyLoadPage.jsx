import "./LazyLoadPage.css";

function LazyLoadPage() {
  return (
    <div className="mdb-page pt-64 pb-96 h-dvh sm:px-4 text-center">
      <div className="spinner"></div>
      <h4 className="text-2xl font-bold mt-52 glow">Loading<span className="glow">...</span></h4>
    </div>
  );
}

export default LazyLoadPage;
