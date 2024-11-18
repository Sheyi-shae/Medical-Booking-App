import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Step1 {
  firstName: string;
  lastName: string;
  occupation: string;
  number: string;
  gender: string;
  dob: string;
}

interface Step2 {
  allergies: string;
  medicalHistory: string;
  medications: string;
}

interface Step3 {
  email: string;
  password: string;
}

interface PatientState {
  step1: Step1;
  step2: Step2;
  step3: Step3;
}

const initialState: PatientState = {
  step1: {
    firstName: '',
    lastName: '',
    occupation: '',
    number: '',
    gender: '',
    dob: '',
  },
  step2: {
    allergies: '',
  medicalHistory: '',
  medications: ''
  },
  step3: {
    email: '',
    password: ''
  },
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    basicInfo: (state, action: PayloadAction<Step1>) => {
      state.step1 = action.payload;
    },
    medicalInfo: (state, action: PayloadAction<Step2>) => {
      state.step2 = action.payload;
    },
    loginInfo: (state, action: PayloadAction<Step3>) => {
      state.step3 = action.payload;
    },
  },
});

export const { basicInfo, medicalInfo, loginInfo } = patientSlice.actions;
export default patientSlice.reducer;