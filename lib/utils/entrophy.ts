type IntervalConfig = {
    min: number,
    max: number
}

export const randomBool = () => (Math.floor((Math.random() * 27)) % 2 === 0)
export const randomIndex = (target: Array<unknown>) => Math.floor(Math.random() * target.length)
export const getNonBlockingInterval = (intervalInMs: number) => new Promise((resolve => {
    setTimeout(() => resolve(intervalInMs), intervalInMs)
  
}))

export const getRandomlyDelayedAction = (intervalConfig: IntervalConfig, action: () => Promise<unknown>): Promise<unknown> => {
    const amount = randomInInterval(intervalConfig.min, intervalConfig.max)

    return getNonBlockingInterval(amount).then(() => action())
}

export const randomInInterval = (min: number, max: number) =>  Math.floor(Math.random() * (max - min + 1) + min)
export const actionBetween10And20 = getRandomlyDelayedAction.bind(null, {min: 11000, max: 19000})