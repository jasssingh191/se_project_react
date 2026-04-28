import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getWeather } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { LOCATION_COORDS } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "New York",
    temperature: { F: 75, C: 24 },
    type: "hot",
    condition: "Clear",
    icon: "02d",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getWeather(LOCATION_COORDS.latitude, LOCATION_COORDS.longitude)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Failed to fetch weather:", error));
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const handleOpenAddClothesModal = () => setActiveModal("add-clothes");

  const handleOpenItemModal = (card) => {
    setSelectedCard(card);
    setActiveModal("item-details");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleOpenDeleteModal = () => {
    setActiveModal("delete-confirmation");
  };

  const handleAddItem = (item, resetForm) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
        resetForm();
      })
      .catch((error) => console.error("Failed to add item:", error));
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== card._id));
        handleCloseModal();
      })
      .catch((error) => console.error("Failed to delete item:", error));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          onAddClothesClick={handleOpenAddClothesModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                onCardClick={handleOpenItemModal}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onCardClick={handleOpenItemModal}
                onAddNewClick={handleOpenAddClothesModal}
              />
            }
          />
        </Routes>
        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-clothes"}
          onCloseModal={handleCloseModal}
          onAddItem={handleAddItem}
        />

        <ItemModal
          isOpen={activeModal === "item-details"}
          card={selectedCard}
          onClose={handleCloseModal}
          onDeleteClick={handleOpenDeleteModal}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          card={selectedCard}
          onClose={handleCloseModal}
          onConfirmDelete={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
