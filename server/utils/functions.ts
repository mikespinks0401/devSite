export const sleep = (minTime:number):Promise<void> => {

    const useSleepTime = Math.floor(Math.random() * 1000) + minTime
    return new Promise(resolve => {
        setTimeout(resolve, useSleepTime)
    })
}