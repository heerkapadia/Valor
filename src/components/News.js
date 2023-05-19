import React, { useEffect } from 'react'
import axios from 'axios'

function News() {
    useEffect(() => {
        const getNews = async () => {
            await axios({
                method: "get",
                url: 'https://newsapi.org/v2/everything?q=Indian Army&from=2023-01-17&sortBy=latest&apiKey=c3ee83e087974603994090b5502bf4ca',

            }).then((res) => {
                console.log("hhh", res);
            })
        }
    }, [])
    return (
        <div>News</div>
    )
}

export default News