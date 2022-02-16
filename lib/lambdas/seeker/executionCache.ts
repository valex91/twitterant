 const seenThisExecution = new Map()

export const hasAlreadyBeenSeen = (id :string) => seenThisExecution.has(id)
export const setSeenForThisExecution = (id: string) => seenThisExecution.set(id, true)
export const clearCache = () => seenThisExecution.clear()