import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
  // SerializedError,
} from '@reduxjs/toolkit';

import { getAddress } from '../../services/apiGeocoding';

interface Position {
  latitude: string;
  longitude: string;
}

interface Address {
  locality?: string;
  city?: string;
  postcode?: string;
  countryName?: string;
}

function getPosition(): Promise<Position> {
  return new Promise<Position>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      (error) => reject(error)
    );
  });
}

async function fetchAddress(): Promise<{
  position: Position;
  address: string;
}> {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position: Position = {
    latitude: positionObj.latitude,
    longitude: positionObj.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj: Address = await getAddress(position);
  const address: string = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // Payload of the fullfilled state
  return { position, address };
}

export const fetchUserAddress = createAsyncThunk(
  'user/fetchAddress',
  fetchAddress
);

type UserState = {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: Position;
  address: string;
  error: string | undefined;
};

const initialState: UserState = {
  username: '',
  status: 'idle',
  position: { longitude: '0', latitude: '0' },
  address: '',
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
