import { TweetV2 } from "twitter-api-v2"
import { clearCache } from "../lib/lambdas/seeker/executionCache"
import { seeker } from "../lib/lambdas/seeker/handler"
import { twitterClientGenerator } from "../lib/utils/twitterClientGenerator"


jest.mock('../lib/utils/twitterClientGenerator')
const twitterGeneratorMock = twitterClientGenerator as jest.Mock

const generateFkTweetsWithActions = (length: number) => Array.from({ length }, (_, id) => ({ id, author_id: 'authID', text: 'twitterText @valex91 @str_nge @us3r @us3r' }))

describe('seeker', () => {
  describe('when there is less than 15 action points', () => {
    beforeEach(() => {
      twitterGeneratorMock.mockReturnValue({
        v2: {
          search: jest.fn().mockResolvedValue(generateFkTweetsWithActions(5))
        }
      })
      clearCache()
    })

    it('should query the client with the correct query', async () => {
      await expect(seeker()).resolves.toEqual([

        {
          "actionsInBatch": 12,
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
            },
            {
              "actionImpact": 4,
              "author": "authID",
              "id": 1,
              "toFollow": [
                "valex91",
                "str_nge",
                "us3r",
              ],
            },
            {
              "actionImpact": 4,
              "author": "authID",
              "id": 2,
              "toFollow": [
                "valex91",
                "str_nge",
                "us3r",
              ],
            },
          ],
        },
        {
          "actionsInBatch": 8,
          "batch": [
            {
              "actionImpact": 4,
              "author": "authID",
              "id": 3,
              "toFollow": [
                "valex91",
                "str_nge",
                "us3r",
              ],
            },
            {
              "actionImpact": 4,
              "author": "authID",
              "id": 4,
              "toFollow": [
                "valex91",
                "str_nge",
                "us3r",
              ],
            },
          ],
        },
      ])
    })
  })

  describe('when there is more than 15 action points', () => {
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
      expect(seekerResults[0]).toEqual(
        { "actionsInBatch": 12, "batch": [{ "actionImpact": 4, "author": "authID", "id": 0, "toFollow": ["valex91", "str_nge", "us3r"] }, { "actionImpact": 4, "author": "authID", "id": 1, "toFollow": ["valex91", "str_nge", "us3r"] }, { "actionImpact": 4, "author": "authID", "id": 2, "toFollow": ["valex91", "str_nge", "us3r"] }] }
      )
      expect(seekerResults[1]).toEqual({ "actionsInBatch": 12, "batch": [{ "actionImpact": 4, "author": "authID", "id": 3, "toFollow": ["valex91", "str_nge", "us3r"] }, { "actionImpact": 4, "author": "authID", "id": 4, "toFollow": ["valex91", "str_nge", "us3r"] }, { "actionImpact": 4, "author": "authID", "id": 5, "toFollow": ["valex91", "str_nge", "us3r"] }] })
    })
  })

  describe('when there is duplicates', () => {
    beforeEach(() => {
      twitterGeneratorMock.mockReturnValue({
        v2: {
          search: jest.fn().mockResolvedValue([...generateFkTweetsWithActions(5), ...generateFkTweetsWithActions(5)])
        }
      })
      clearCache()
    })

    it('should ignore em', async () => {
      await expect(seeker()).resolves.toEqual(
        [
          {
            "actionsInBatch": 12,
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
              },
              {
                "actionImpact": 4,
                "author": "authID",
                "id": 1,
                "toFollow": [
                  "valex91",
                  "str_nge",
                  "us3r",
                ],
              },
              {
                "actionImpact": 4,
                "author": "authID",
                "id": 2,
                "toFollow": [
                  "valex91",
                  "str_nge",
                  "us3r",
                ],
              },
            ],
          },
          {
            "actionsInBatch": 8,
            "batch": [
              {
                "actionImpact": 4,
                "author": "authID",
                "id": 3,
                "toFollow": [
                  "valex91",
                  "str_nge",
                  "us3r",
                ],
              },
              {
                "actionImpact": 4,
                "author": "authID",
                "id": 4,
                "toFollow": [
                  "valex91",
                  "str_nge",
                  "us3r",
                ],
              },
            ],
          },
        ]
      )
    })
  })
})