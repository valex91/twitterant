import { TweetV2 } from "twitter-api-v2"
import { clearCache } from "../lib/lambdas/seeker/executionCache"
import { seeker } from "../lib/lambdas/seeker/handler"
import { twitterClientGenerator } from "../lib/utils/twitterClientGenerator"


jest.mock('../lib/utils/twitterClientGenerator')
const twitterGeneratorMock = twitterClientGenerator as jest.Mock

const generateFkTweetsWithActions = (length: number) => Array.from({ length }, (_, id) => ({ id, author_id: 'authID', text: 'twitterText @valex91 @str_nge @us3r @us3r' }))

describe('seeker', () => {
  describe('when there is less than 6 action points', () => {
    beforeEach(() => {
      twitterGeneratorMock.mockReturnValue({
        v2: {
          search: jest.fn().mockResolvedValue(generateFkTweetsWithActions(1))
        }
      })
      clearCache()
    })

    it('should return you the batched tweet as it does not goes over the random limit', async () => {
      await expect(seeker()).resolves.toEqual([
        {
          "actionsInBatch": 4,
          "batch": [
            {
              "actionImpact": 4,
              "author": "authID",
              "id": 0,
              "toFollow": [
                "valex91",
                "str_nge",
                "us3r",
              ],
            }
          ],
        }
      ])
    })
  })

  describe('when there is more than between 6 and 15 action points', () => {
    beforeEach(() => {
      twitterGeneratorMock.mockReturnValue({
        v2: {
          search: jest.fn().mockResolvedValue(generateFkTweetsWithActions(20))
        }
      })
      clearCache()
    })

    it('should query the client with the correct query', async () => {
      const seekerResults = await seeker()
      expect(seekerResults.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('when there is duplicates', () => {
    beforeEach(() => {
      twitterGeneratorMock.mockReturnValue({
        v2: {
          search: jest.fn().mockResolvedValue([...generateFkTweetsWithActions(1), ...generateFkTweetsWithActions(1)])
        }
      })
      clearCache()
    })

    it('should ignore em', async () => {
      await expect(seeker()).resolves.toEqual(
        [
          {
            "actionsInBatch": 4,
            "batch": [
              {
                "actionImpact": 4,
                "author": "authID",
                "id": 0,
                "toFollow": [
                  "valex91",
                  "str_nge",
                  "us3r",
                ],
              }
            ],
          }
        ]
      )
    })
  })
})