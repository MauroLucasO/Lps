import "bootswatch/dist/flatly/bootstrap.css";
import Imagem from "../assets/imagem/Sistema De Lanchonete.png";

export default function Home() {
    return (
        <div className="container d-flex flex-column" style={{ minHeight: '90vh', paddingTop: '80px' }}>
            <div className="row flex-grow-1 mt-5">
                <div className="col-lg-8 offset-lg-1 text-start">
                    <h1 className="display-4 fw-bold mb-2" style={{ color: '#2C3E50' }}>
                        Sistema de Lanchonete
                    </h1>
                    <p className="lead fs-4" style={{ fontWeight: '300', lineHeight: '1.4' }}>
                        Gerencie pedidos, produtos e clientes com eficiência.
                        Uma solução moderna para agilizar o seu atendimento e controle.
                    </p>
                </div>
            </div>

            <footer className="text-center mt-auto p-4" style={{ backgroundColor: "#f5f5f5", fontSize: "12px", color: "#999" }}>
                <p className="mb-0">Copyright © 2025 Luan e Mauro. Todos os direitos reservados.</p>
                <p className="mb-0">Sistema de Informação - Desenvolvido para a disciplina de Linguagem de Programação 2.</p>
            </footer>

        </div>
    );
}
