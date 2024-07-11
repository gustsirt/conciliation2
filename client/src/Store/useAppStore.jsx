import { create } from "zustand";
import { devtools } from "zustand/middleware";
import configStore from './ConfigStore.jsx';
import fileStore from './FileStore.jsx';
import userStore from './UserStore.jsx';

export const useAppStore = create()(devtools((...a) => ({
  ...configStore(...a),
  ...fileStore(...a),
  ...userStore(...a),
}))) 