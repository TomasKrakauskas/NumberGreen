import { MTrack, getPublicTracks, getUserTracks } from "@/helpers/db/tracks";
import { setAll } from "@/helpers/util";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export interface ITrackState {
  loading: boolean;
  userTracks: MTrack[];
  publicTracks: MTrack[];
}
const initialState: ITrackState = {
  loading: true,
  userTracks: [],
  publicTracks: [],
};

export const loadTracks = createAsyncThunk(
  "track/getTracks",
  async (userId: string) => {
    try {
      // get tracks
      const [[userError, userTracks], [publicError, publicTracks]] =
        await Promise.all([getUserTracks(userId), getPublicTracks()]);

      if (userError) console.error("loadTracks", { userError });
      if (publicError) console.error("loadTracks", { publicError });

      console.log({
        userTracks,
        publicTracks,
      });

      return {
        userTracks: userTracks ? userTracks : [],
        publicTracks: publicTracks ? publicTracks : [],
      };
    } catch (e) {
      console.error(e);
      return new Error("Unable to fetch tracks");
    }
  }
);

const TrackSlice = createSlice({
  name: "tarck",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // load data
      .addCase(loadTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTracks.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadTracks.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error);
      });
  },
});

const baseInfo = (state: { tracks: ITrackState }) => state.tracks;
export default TrackSlice.reducer;

export const {} = TrackSlice.actions;

export const getTrackState = createSelector(baseInfo, (data) => data);
