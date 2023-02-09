import React from 'react'
import './style.css';
import SongResult from './components/SongResult.js'
import AlbumResult from './components/AlbumResult.js'
import MusicVideoResult from './components/MusicVideoResult.js'
import Header from './components/Header.js'

export default function App() {
    // Set data state
    const [data, setData] = React.useState([])
  
    // Set input state
    const [input, setInput] = React.useState({    
        type: "all",
        searchTerm: "",
        numberOfItems: 10
    })

    // Set display mode state
    const [displayMode, setDisplayMode] = React.useState("grid") 

    // Set loading state
    const [loading, setLoading] = React.useState(false)
  

    // Data testing function

    // Create string for fetch API
    const searchString = `https://itunes.apple.com/search?term=${input.searchTerm}${((input.type == 'album') || (input.type == 'song')) ? `&entity=${input.type}` : `&media=${input.type}`}&limit=${input.numberOfItems}`
    
    // Fetch data from iTunes API when search parameters are updated
    React.useEffect(() => {
        console.log(searchString)
        fetch(searchString)
            .then(res => res.json())
            .then(data => setData(data.results))
    }, [input])
  
    // Reset loading state
    
   
    // Take input data
    function handleChangeSearchTerm(event) {
        const { value } = event.target
        
        setInput(prevInput => ({
            ...prevInput,
            searchTerm: value,
        }))
        
    }

    function handleChangeNumberOfItems(event) {
        const {value} = event.target
        
        setInput(prevInput => ({
            ...prevInput,
            numberOfItems: parseInt(value),
        }))
    }

    function handleChangeType(event) {
        const { value } = event.target

        setInput(prevInput => ({
            ...prevInput,
            type: value,
            numberOfItems: value == 'musicVideo' ? 6 : 10
        }))
    }

    function handleChangeDisplayMode(event) {
        const { value } = event.target

        setDisplayMode(value)
        console.log("DisplayMode : " + displayMode)
    }
        
    // Decide results title
    function resultsTitle() {
        if (input.type == 'all') {
            return 'All'
        } else if (input.type == 'musicVideo') {
            return 'Music Videos'
        } else if (input.type == 'music') {
            return 'Songs'
        } else if (input.type == 'album') {
            return 'Albums'
        }
    }    

    // Expand page of results when button is pressed
    function expandResults() {
        // Show loading screen
        setLoading(true);

        // Remove loading screen and add items
        setTimeout(async function() {
            await setInput(prevInput => ({
                ...prevInput,
                numberOfItems: (prevInput.numberOfItems + ((prevInput.type) == 'musicVideo' ? 6 : 10))
            }))

            setLoading(false);
        }, 2000)
    }
     
    // Map data into an array of elements based on type
    const resultElements = data.map(item => {
        if (item.wrapperType == 'collection') {
            return (
                <AlbumResult 
                    data={item} 
                    displayMode={displayMode}
                />
            )
        } else if (item.kind == 'music-video') {
            return (
                <MusicVideoResult 
                    data={item}
                    displayMode={displayMode}
                />
            )
        } else {
            return (
                <SongResult 
                    data={item}
                    displayMode={displayMode}
                />
            )
        }
    })
    

    // Page layout
    return (
        <div className="container">
            <Header 
                input={input}
                handleChangeSearchTerm={handleChangeSearchTerm}
                handleChangeNumberOfItems={handleChangeNumberOfItems}
                handleChangeType={handleChangeType}
                displayMode={displayMode}
                handleChangeDisplayMode={handleChangeDisplayMode}
            />
            <div className="main">
                <h1>{(resultElements.length > 0) && (input.searchTerm != '' && resultsTitle())}</h1>
                <div className={`results-container-${input.type == 'musicVideo' ? 'music-video' : 'song'}-${displayMode}`}>
                    {input.searchTerm != '' && resultElements}
                </div>
                {resultElements.length == 0 
                    &&
                    <div className="noResults-container">
                        <h1>{input.searchTerm == '' ? 'Start Looking . . .' : 'No Results Found'}</h1>
                    </div> 
                }  
                {loading &&
                    <div className="loading-icon-container">
                        <i className="fa-duotone fa-spinner-third loading-icon"></i>
                    </div>
                } 
                {resultElements.length > 0  && 
                    <div className="expand-container">
                        {loading ?
                            <div className="expand-loading"><i className="fa-solid fa-spinner"></i></div> 
                        :
                            <div className="expand-button" onClick={expandResults}>▼</div>
                        }
                    </div>
                }  
                </div>
            </div>
    )
}