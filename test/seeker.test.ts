import { seeker } from "../lib/lambdas/seeker/handler"

describe('seeker', () => {
    it('should seek the tweet for an expected query', async() => {
        await expect(seeker()).resolves.toEqual([])
    })
})