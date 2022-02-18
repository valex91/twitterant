import { randomInInterval } from './../../utils/entrophy';
import { randomBool, randomIndex } from "../../utils/entrophy"

const agentPrideGenerator = (agent: string, toInterpolate: string) => toInterpolate.replace(/\([^)]*\)/, agent)
export const thanks = ['Thank you', 'Ty', 'TY', 'Ta', 'TA', 'grazie', 'cheers', 'Cheers', 'tyvm', '']
export const agents = ['Astra', 'Breach', 'Brimstone', 'Cypher', 'Jett', 'Killjoy', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru', 'Neon', 'Chamber']
export const opportunity = ['Check this', 'have a look here', 'dis', '👀', '👀👀👀', 'plsplspls', 'need', 'luck sometimes pls', 'NEED', 'done', 'need some more skins']
export const emojii = ['🧡', '💜', '❤', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '😍', '😘', '😻']
export const empties = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '　']
export const genericAgentPride = [
    ...agents.map((a) => agentPrideGenerator(a, 'the (agent) gang need this')),
    ...agents.map((a) => agentPrideGenerator(a, 'would go well with (agent) ')),
    ...agents.map((a) => agentPrideGenerator(a, '(agent) represent')),
    ...agents.map((a) => agentPrideGenerator(a, '(agent) loves it'))
]

export const replyGenerator = () => {
    const possibilities = [...thanks, ...emojii, ...opportunity, ...genericAgentPride]
    const pick = possibilities[randomIndex(possibilities)]
    const spacin = empties[randomIndex(empties)].repeat(randomInInterval(1,3))
    const moreSpacin = empties[randomIndex(empties)].repeat(randomInInterval(1,3))
    const tags = randomBool() ? ['@valesteve91','@ValorantVale'].join(` ${spacin} `) : ['@ValorantVale','@valesteve91'].join(` ${spacin} `)

    return randomBool() ? [pick,tags].join(`${moreSpacin} `) : [tags,pick].join(` ${moreSpacin}`)
}

