import React from 'react'

export default function MusicVideoResult(props) {
    return(
        <div className={`result-music-video-${props.displayMode}`}>
            <a href={props.data.trackViewUrl}><img src={(props.data.artworkUrl100).replace("100x100", "800x800")}></img></a>
            <h3>{props.data.trackName}</h3>
            <h4>{props.data.artistName}</h4>
        </div>

    )
}