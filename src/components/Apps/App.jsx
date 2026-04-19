import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
import ItemModal from "./components/ItemModal";
import { getWeather } from "../utils/weatherApi";
import { LOCATION_COORDS } from "../utils/constants";
import { defaultClothingItems } from "../utils/clothingItems";
import "./App.css";

function App() {
  // Weather state
  const [weatherData, setWeatherData] = useState({
    city: "Portland",
    temperature: 70,
    condition: "Clear",
    description: "clear sky",
  });

  // Clothing items state
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  // Modal states
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch weather on component mount
  useEffect(() => {
    getWeather(LOCATION_COORDS.latitude, LOCATION_COORDS.longitude)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Failed to fetch weather:", error));
  }, []);

  // Modal handlers
  const handleOpenAddClothesModal = () => {
    setActiveModal("add-clothes");
  };

  const handleOpenItemModal = (card) => {
    setSelectedCard(card);
    setActiveModal("item-details");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  // Close modal on escape key or overlay click
  useEffect(() => {
    if (!activeModal) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

  return (
    <div className="app">
      <Header onAddClothesClick={handleOpenAddClothesModal} />
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
      >
        {/* Form inputs will go here */}
      </ModalWithForm>

      <ItemModal
        isOpen={activeModal === "item-details"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
