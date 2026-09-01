import Dexie from "dexie"
import dexieCloud, { type DexieCloudTable } from "dexie-cloud-addon"
import type { ParticipantBasic } from "./types"

export const db = new Dexie("mydb", { addons: [dexieCloud] }) as Dexie & {
  participants: DexieCloudTable<ParticipantBasic, "id">
}

db.version(1).stores({
  participants: `
  id,
  first_name,
  last_name,
  nickname,
  avatar,
  participant_status`,
})
