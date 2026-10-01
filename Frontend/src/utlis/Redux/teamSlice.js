import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
    name: "Teams",

    initialState: {
        teams: [],
        totalTeams: 0
    },

    reducers: {
        addTeams: (state, action) => {
            state.teams = action.payload.teams;
            state.totalTeams = action.payload.totalTeams;
        }
    }
});

export const { addTeams } = teamsSlice.actions;