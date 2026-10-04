import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "Teams",

  initialState: {
    teams: [],
    totalTeams: 0,
  },

  reducers: {
    addTeams: (state, action) => {
      state.teams = action.payload.teams;
      state.totalTeams = action.payload.totalTeams;
    },

    addTeam: (state, action) => {
      state.teams.push(action.payload);
      state.totalTeams += 1;
    },

    updateTeamStatus: (state, action) => {
      const { teamId, isActive } = action.payload;

      const team = state.teams.find(
        (item) => item._id === teamId
      );

      if (team) {
        team.isActive = isActive;
      }
    },
  },
});

export const {
  addTeams,
  addTeam,
  updateTeamStatus,
} = teamsSlice.actions;

export default teamsSlice.reducer;