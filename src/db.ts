import mongoose from 'mongoose';
import config from './config';

const USERNAME: string = config?.mongodb_username ?? '';
const PASSWORD: string = config?.mongodb_password ?? '';
const MISC: string = config?.mongodb_misc ?? '';
const mongoConnectionString = `mongodb+srv://${USERNAME}:${PASSWORD}@${MISC}?retryWrites=true&w=majority`;

mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
