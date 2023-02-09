import React from 'react'

export default function Header(props) {
    return (
        <div className="searchForm">
            <div className="row-1">
            <h1>iTunes Search</h1>
                <input className="search-bar"
                    type="text"
                    name="searchTerm"
                    placeholder="Look for a song or artist..."
                    onChange={props.handleChangeSearchTerm}
                >
                </input>
            </div>
            <div className="row-2">
                <div className="media-buttons">
                    <button className={props.input.type == 'all' ? 'media-button-selected' : 'media-button'} value="all" onClick={props.handleChangeType}>All</button>
                    <button className={props.input.type == 'song' ? 'media-button-selected' : 'media-button'} value="song" onClick={props.handleChangeType}>Song</button>
                    <button className={props.input.type == 'musicVideo' ? 'media-button-selected' : 'media-button'} value="musicVideo" onClick={props.handleChangeType}>Music Video</button>
                    <button className={props.input.type == 'album' ? 'media-button-selected' : 'media-button'} value="album" onClick={props.handleChangeType}>Album</button>
                </div>
                <div className="display-buttons">
                    <button className={props.displayMode == 'grid' ? 'display-button-selected' : 'display-button'} value="grid" onClick={props.handleChangeDisplayMode}><i className="fa-solid fa-grip"></i></button>
                    <button className={props.displayMode == 'list' ? 'display-button-selected' : 'display-button'} value="list" onClick={props.handleChangeDisplayMode}><i className="fa-solid fa-list"></i></button>
                </div>
            </div>
        </div>
    )
}