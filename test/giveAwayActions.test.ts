import { TwitterApi } from 'twitter-api-v2';
import { giveAwayActions } from './../lib/lambdas/giveAwayActions/giveAwayActions';
const clientMock = {
    v2: {
        usersByUsernames: jest.fn().mockResolvedValue({data: [{id: '69'}, {id: '420'}]}),
        retweet: jest.fn().mockResolvedValue(''),
        reply: jest.fn().mockResolvedValue(''),
        follow: jest.fn().mockResolvedValue(''),
        like: jest.fn().mockResolvedValue('')
    }
}

const relevantTweetInfo = {
    id: '1337',
    author:  'author',
    toFollow: ['me', 'myself', 'I'],
    actionImpact: 6
}

jest.setTimeout(120000)
describe('giveAwayActions', () => {
    describe('when there is a tweet with relevant info', () => {
        beforeEach(async() => {
            await giveAwayActions(relevantTweetInfo, clientMock as unknown as TwitterApi, 'myID')
        })
        it('should have performed the actions', () => {
            expect(clientMock.v2.follow).toHaveBeenCalledWith('myID', 'author')
            expect(clientMock.v2.usersByUsernames).toHaveBeenCalledWith(["me", "myself", "I"])
            expect(clientMock.v2.follow).toHaveBeenCalledWith('myID', 'author')
            expect(clientMock.v2.follow).toHaveBeenCalledWith('myID', '69')
            expect(clientMock.v2.follow).toHaveBeenCalledWith('myID', '420')
            expect(clientMock.v2.retweet).toHaveBeenCalledWith('myID', '1337')
            expect(clientMock.v2.reply).toHaveBeenCalledWith(expect.stringMatching(/(.*@ValorantVale.*|.*@valesteve91.*){2}/g), '1337')
            expect(clientMock.v2.like).toHaveBeenCalledWith('myID', '1337')
        })
    })
})