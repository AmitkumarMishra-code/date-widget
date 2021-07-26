import { useEffect, useState } from "react"

export default function DateWidget() {
    const [days, setDays] = useState([])
    const msInADay = 86400000
    const todayString = (new Date(Date.now())).toString().substring(4, 10)

    useEffect(() => {
        let today = Date.now()
        let startDays = [today - (3 * msInADay), today - (2 * msInADay), today - msInADay, today, today + msInADay, today + (2 * msInADay), today + (3 * msInADay)]
        setDays(startDays)
    }, [])

    const getDisplayDate = (day) => {
        let date = new Date(day)
        let displayString = date.toString()
        return displayString.substring(4, 10)
    }

    const prevHandler = () => {
        let anchor = days[0]
        let prevWeek = []
        for(let i = 7; i>=0; i--){
            prevWeek.push(anchor - (i*msInADay))
        }
        setDays(prevWeek)
    }

    const nextHandler = () => {
        let anchor = days[6]
        let nextWeek = []
        for(let i = 1; i<=7; i++){
            nextWeek.push(anchor + (i*msInADay))
        }
        setDays(nextWeek)
    }

    return (
        <div className="container">
            <button className="prev" onClick = {prevHandler}>
                <div className="circle"></div>
            </button>
            <div className="days">
                {days.length > 0 && days.map((day, idx) => <p className={getDisplayDate(day) === todayString ? 'highlighted' : 'gray'} key = {idx}>{getDisplayDate(day)}</p>)}
            </div>
            <button className="next" onClick = {nextHandler}>
                <div className="circle"></div>
            </button>
        </div>
    )
}