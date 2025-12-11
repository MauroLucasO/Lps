import "bootswatch/dist/flatly/bootstrap.css";
import Imagem from "../assets/imagem/Sistema De Lanchonete.png";

export default function Home() {
    return (
        <div className="container mt-4">

            <div className="card mb-4">
                <h3
                    className="card-header text-center"
                    style={{ backgroundColor: "#2C3E50", color: "white" }}
                >
                    Sistema de Lanchonete
                </h3>

                <div className="card-body">
                    <h5 className="card-title text-center">logo:</h5>
                </div>

                <div className="text-center p-3">
                    <img 
                        src={Imagem}
                        alt="Imagem"
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                </div>
            </div>

            <div className="row justify-content-center">

                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div 
                            className="card-header text-center"
                            style={{ backgroundColor: "#2C3E50", color: "white" }}
                        >
                            Membros:
                        </div>
                        <div className="card-body text-center">
                            <h4 className="card-title">Luan</h4>
                            <p className="card-text">Sistema de Informação</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div 
                            className="card-header text-center"
                            style={{ backgroundColor: "#2C3E50", color: "white" }}
                        >
                            Membros:
                        </div>
                        <div className="card-body text-center">
                            <h4 className="card-title">Mauro</h4>
                            <p className="card-text">Sistema de Informação</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
