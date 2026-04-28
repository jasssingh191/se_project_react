import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__input"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <div className="toggle-switch__track">
        <div className="toggle-switch__thumb" />
        <span className="toggle-switch__label toggle-switch__label_f">F</span>
        <span className="toggle-switch__label toggle-switch__label_c">C</span>
      </div>
    </label>
  );
}

export default ToggleSwitch;
