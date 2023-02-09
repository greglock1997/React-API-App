import React from 'react'

export default function AlbumResult(props) {
    return(  
        <div className={`result-song-${props.displayMode}`}>
            <a href={props.data.collectionViewUrl}><img src={(props.data.artworkUrl100).replace("100x100", "800x800")}></img></a>
            <h3>{props.data.collectionName}</h3>
            <h4>{props.data.artistName}</h4>
        </div>
    )
}