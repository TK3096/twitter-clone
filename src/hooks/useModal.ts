import type { User } from '@prisma/client'

import { create } from 'zustand'

type ModalType = 'login' | 'register' | 'edit-user'

interface ModalData {
  user?: User
}

interface ModalStore {
  type: ModalType | null
  data?: ModalData
  cb?: (...args: any) => void
  open: boolean
  onOpen: (
    type: ModalType | null,
    data?: ModalData,
    cb?: (...args: any) => void,
  ) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type, data, cb) => set({ type, data, open: true, cb }),
  onClose: () => set({ open: false, type: null, data: undefined }),
}))
