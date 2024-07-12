import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createConfigStore from './ConfigStore.jsx';
import createFileStore  from './FileStore .jsx';
import createUserStore from './UserStore.jsx';

export const useAppStore = create()(devtools((...a) => ({
  ...createConfigStore(...a),
  ...createFileStore (...a),
  ...createUserStore(...a),
}))) 