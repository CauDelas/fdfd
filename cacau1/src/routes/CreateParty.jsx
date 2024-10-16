import partyFetch from "../axios/config";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const CreateParty = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [partyServices, setPartyServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data);
    };
    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.find((s) => s._id === value);

    setPartyServices((prevServices) => {
      return checked ? [...prevServices, filteredService] : prevServices.filter((s) => s._id !== value);
    });
  };

  const createParty = async (e) => {
    e.preventDefault();
    try {
      const party = { title, author, description, budget, date, image, services: partyServices };
      const res = await partyFetch.post("/parties", party);
      if (res.status === 201) {
        navigate("/");
        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response?.data?.msg || "An error occurred", "error");
    }
  };
  return (
    <div className="form-page">
      <h2>Adicionar cliente</h2>
      <p>Defina o seu orçamento e escolha a atividade que deseja</p>
      <form onSubmit={createParty}>
        <label htmlFor="title">
          <span>Nome do Pet:</span>
          <input
            id="title"
            type="text"
            placeholder="Digite o nome do seu Pet"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label htmlFor="author">
          <span>Tutor:</span>
          <input
            id="author"
            type="text"
            placeholder="Nome do responsavel pelo animal:"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder="Fale sobre o seu animal ou alguma observação"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </label>
        <label htmlFor="budget">
          <span>Orçamento:</span>
          <input
            id="budget"
            type="number"
            placeholder="Quanto deseja gastar?"
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
            required
          />
        </label>
        <label htmlFor="date">
          <span>Data:</span>
          <input
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </label>
        <label htmlFor="image">
          <span>Imagem:</span>
          <input
            id="image"
            type="text"
            placeholder="Insira a URL de uma imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
          />
        </label>
        <div>
          <h2>Escolha as atividades que deseja:</h2>
          <div className="services-container">
            {services.length === 0 ? <p>Carregando...</p> : services.map((service) => (
              <div className="service" key={service._id}>
                <img src={service.image} alt={service.name} />
                <p className="service-name">{service.name}</p>
                <p className="service-price">R${service.price}</p>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    value={service._id}
                    onChange={handleServices}
                  />
                  <p>Marque para solicitar</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <input type="submit" value="Adicionar" className="btn" />
      </form>
    </div>
  );
};

export default CreateParty;