export const thanks = ['Thank you', 'Ty', 'TY', 'Ta', 'TA', 'grazie', 'cheers', 'Cheers', 'tyvm']
export const opportunity = ['Check this out', 'have a look here', 'dis', '👀', '👀👀👀', 'plsplspls', 'need']
export const emojii = ['❤️', '🧡', '💜', '❤','🧡','💛','💚','💙','💜','🤎','🖤','🤍','❣','💕','💞','💓','💗','💖','💘','💝','💟', '😍','😘','😻']

export const replyGenerator = () => {
    const possibilities = [...thanks, ...emojii, ...opportunity]
    const pick = possibilities[Math.floor(Math.random() * possibilities.length)]
    const tags = '@valesteve91 @ValorantVale'

    return (Math.floor((Math.random() * 27)) % 2 === 0) ? `${pick} ${tags}` : `${tags} ${pick}`
}

