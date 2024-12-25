import { useToast } from "dialog-hooks"
import { ChangeEvent } from "react"
import { useCreateSong, useOpenSong, useSaveSong } from "../actions"
import { saveFile, saveFileAs, useOpenFile } from "../actions/file"
import { useLocalization } from "../localize/useLocalization"
import { useStores } from "./useStores"

export const useSongFile = () => {
  const rootStore = useStores()
  const toast = useToast()
  const localized = useLocalization()
  const { song } = rootStore
  const createSong = useCreateSong()
  const openSong = useOpenSong()
  const saveSong = useSaveSong()
  const openFile = useOpenFile()

  return {
    async createNewSong() {
      if (song.isSaved || confirm(localized["confirm-new"])) {
        createSong()
      }
    },
    async openSong() {
      try {
        if (song.isSaved || confirm(localized["confirm-open"])) {
          await openFile()
        }
      } catch (e) {
        toast.error((e as Error).message)
      }
    },
    async openSongLegacy(e: ChangeEvent<HTMLInputElement>) {
      try {
        if (song.isSaved || confirm(localized["confirm-new"])) {
          await openSong(e.currentTarget)
        }
      } catch (e) {
        toast.error((e as Error).message)
      }
    },
    async saveSong() {
      await saveFile(rootStore)
    },
    async saveAsSong() {
      await saveFileAs(rootStore)
    },
    async downloadSong() {
      saveSong()
    },
  }
}
