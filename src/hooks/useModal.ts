import type { User } from '@prisma/client'

import { create } from 'zustand'

type ModalType = 'login' | 'register' | 'edit-user'

interface ModalData {
  user?: User
}

interface ModalStore {
  type: ModalType | null
  data?: ModalData
  open: boolean
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type, data) => set({ type, data, open: true }),
  onClose: () => set({ open: false, type: null, data: undefined }),
}))
