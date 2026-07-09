import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import { LOCATION_COORDS } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getWeather(LOCATION_COORDS.latitude, LOCATION_COORDS.longitude)
      .then((data) => setWeatherData(data))
      .catch((error) => import.meta.env.DEV && console.error("Failed to fetch weather:", error));
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) => import.meta.env.DEV && console.error("Failed to fetch items:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        import.meta.env.DEV && console.error("Token check failed:", error);
      });
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
  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleOpenLoginModal = () => setActiveModal("login");
  const handleOpenEditProfileModal = () => setActiveModal("edit-profile");

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
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        handleCloseModal();
        resetForm();
      })
      .catch((error) => import.meta.env.DEV && console.error("Failed to add item:", error));
  };

  const handleDeleteItem = (card) => {
    const token = localStorage.getItem("jwt");
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== card._id));
        handleCloseModal();
      })
      .catch((error) => import.meta.env.DEV && console.error("Failed to delete item:", error));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked ? removeCardLike(id, token) : addCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((error) => import.meta.env.DEV && console.error("Failed to update like:", error));
  };

  const authenticate = ({ email, password }) => {
    return signin({ email, password }).then((res) => {
      localStorage.setItem("jwt", res.token);
      return checkToken(res.token).then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      });
    });
  };

  const handleRegistration = ({ name, avatar, email, password }, resetForm) => {
    signup({ name, avatar, email, password })
      .then(() => authenticate({ email, password }))
      .then(() => {
        handleCloseModal();
        resetForm();
      })
      .catch((error) => import.meta.env.DEV && console.error("Registration failed:", error));
  };

  const handleLogin = ({ email, password }, resetForm) => {
    authenticate({ email, password })
      .then(() => {
        handleCloseModal();
        resetForm();
      })
      .catch((error) => import.meta.env.DEV && console.error("Login failed:", error));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch((error) => import.meta.env.DEV && console.error("Failed to update profile:", error));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onAddClothesClick={handleOpenAddClothesModal}
            onRegisterClick={handleOpenRegisterModal}
            onLoginClick={handleOpenLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleOpenItemModal}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleOpenItemModal}
                    onAddNewClick={handleOpenAddClothesModal}
                    onCardLike={handleCardLike}
                    onEditProfileClick={handleOpenEditProfileModal}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
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

          <RegisterModal
            isOpen={activeModal === "register"}
            onCloseModal={handleCloseModal}
            onRegister={handleRegistration}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onCloseModal={handleCloseModal}
            onLogin={handleLogin}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onCloseModal={handleCloseModal}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
