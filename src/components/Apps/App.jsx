import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";
import { LOCATION_COORDS } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/clothingItems";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "New York",
    temperature: 75,
    type: "hot",
    condition: "Clear",
    icon: "02d",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getWeather(LOCATION_COORDS.latitude, LOCATION_COORDS.longitude)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Failed to fetch weather:", error));
  }, []);

  const handleOpenAddClothesModal = () => setActiveModal("add-clothes");

  const handleOpenItemModal = (card) => {
    setSelectedCard(card);
    setActiveModal("item-details");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

  return (
    <div className="app">
      <Header weatherData={weatherData} onAddClothesClick={handleOpenAddClothesModal} />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleOpenItemModal}
      />
      <Footer />

      <ModalWithForm
        isOpen={activeModal === "add-clothes"}
        onClose={handleCloseModal}
        title="New Garment"
        name="add-clothes"
        buttonText="Add garment"
      />

      <ItemModal
        isOpen={activeModal === "item-details"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
