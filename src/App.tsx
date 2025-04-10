import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Marca {
  id: number;
  nombre: string;
}

interface Bus {
  id: number;
  numeroBus: string;
  placa: string;
  fechaCreacion: string;
  caracteristicas: string;
  marca: Marca;
  activo: boolean;
}

interface Page<T> {
  content: T[];
  totalPages: number;
  number: number;
}

const App: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBuses = () => {
    fetch(`http://localhost:8080/bus/paginado?page=${page}&size=${pageSize}&sortBy=id`, {
      headers: {
        Authorization: 'Basic ' + btoa('admin:admin123')
      }
    })
        .then((res) => res.json())
        .then((data: Page<Bus>) => {
          setBuses(data.content);
          setTotalPages(data.totalPages);
          setPage(data.number);
        })
        .catch((err) => console.error('Error al obtener buses:', err));
  };

  useEffect(() => {
    fetchBuses();
  }, [page, pageSize]);

  const handleViewBus = (id: number) => {
    const bus = buses.find(b => b.id === id);
    if (bus) {
      setSelectedBus(bus);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBus(null);
  };

  return (
      <div className="container mt-4">
        <h1 className="mb-4">Lista de Buses CIVA</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label className="me-2">Buses por página:</label>
            <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="form-select d-inline-block w-auto"
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        {/* Formulario */}
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Placa</th>
            <th>Fecha de Creación</th>
            <th>Características</th>
            <th>Marca</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.numeroBus}</td>
                <td>{bus.placa}</td>
                <td>{new Date(bus.fechaCreacion).toLocaleDateString()}</td>
                <td>{bus.caracteristicas}</td>
                <td>{bus.marca?.nombre}</td>
                <td>{bus.activo ? 'Sí' : 'No'}</td>
                <td>
                  <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleViewBus(bus.id)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="d-flex justify-content-center gap-2 mb-4">
          <button
              className="btn btn-outline-secondary"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
          >
            Anterior
          </button>
          <span className="align-self-center">
          Página {page + 1} de {totalPages}
        </span>
          <button
              className="btn btn-outline-secondary"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
          >
            Siguiente
          </button>
        </div>

        {/* Modal */}
        {showModal && selectedBus && (
            <div style={modalOverlayStyle}>
              <div style={modalStyle}>
                <h3 className="mb-3 text-center">Detalles del Bus CIVA</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><strong>ID:</strong> {selectedBus.id}</li>
                  <li><strong>Número:</strong> {selectedBus.numeroBus}</li>
                  <li><strong>Placa:</strong> {selectedBus.placa}</li>
                  <li><strong>Fecha de Creación:</strong> {new Date(selectedBus.fechaCreacion).toLocaleDateString()}</li>
                  <li><strong>Características:</strong> {selectedBus.caracteristicas}</li>
                  <li><strong>Marca:</strong> {selectedBus.marca.nombre}</li>
                  <li><strong>Activo:</strong> {selectedBus.activo ? 'Sí' : 'No'}</li>
                </ul>
                <div className="text-center mt-3">
                  <button className="btn btn-outline-dark" onClick={closeModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  width: '450px',
  fontSize: '16px',
  fontFamily: 'Arial, sans-serif'
};

export default App;
