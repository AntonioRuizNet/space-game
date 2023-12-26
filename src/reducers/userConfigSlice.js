import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userConfig: { logged: false, logs: [] },
  mode: "rest",
  ship: {
    icon: "images/naves/1.jpeg",
    name: "Cazador Estelar Aether",
    combustible: 0,
    almacenaje: [],
    escudos: 0,
    armamento: 50,
    nivel: 0,
    experiencia: 0,
  },
  ubication: {
    background: "images/hangares/hangar4.jpeg",
    icon: "images/hangares/hangar4.jpeg",
    name: "Estación Espacial",
    temperatura: 14,
    gravedad: 10,
    porcentajeTierra: 30,
    size: 6,
  },
};

const userConfigSlice = createSlice({
  name: "aplicationConfig",
  initialState,
  reducers: {
    setUserConfig: (state, action) => {
      state.userConfig = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    addLog: (state, action) => {
      state.userConfig.logs = [...state.userConfig.logs, action.payload];
    },
    updateStatShip: (state, action) => {
      const { key, data } = action.payload;
      const existKey = key in state.ship;
      if (existKey) state.ship[key] = data;
      else console.log("Redux key not found.");
    },
    updateUbication: (state, action) => {
      state.ubication = action.payload;
    },
  },
});

export const { setUserConfig, setMode, updateStatShip, addLog, updateUbication } = userConfigSlice.actions;
export default userConfigSlice.reducer;
