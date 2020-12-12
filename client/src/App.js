import * as React from 'react';
import {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import { travelLogEntries } from './API';


const App = ()=> {
	const [travelEntries, setTravelEntries] = useState([]);
	const [EntryLocation, setEntryLocation] = useState(null);
	const [showPopUp, setShowPopUp] = useState({});
	const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 29.976480,
    longitude: 31.131302,
    zoom: 3
  });
	
  //Adding API data from the server	
  //useEffect can run a function once, while useState runs always when a state is changed.
  useEffect(()=>{
	//you cannot make an async function on the useEffect callback so 
	//we use IIFE here inside
	  (async ()=>{
		const travelEntries = await travelLogEntries();
		  setTravelEntries(travelEntries);
		console.log(travelEntries);
	  })();

  },[]);
	
 const addMarkerPopUp = (event)=>{
	 const [longitude, latitude] = event.lngLat;
	 
	 setEntryLocation({
    	longitude,
		latitude
	 });
	 console.log(EntryLocation);
 }
	
	
  return (
    <ReactMapGL
      {...viewport}
	  mapStyle= "mapbox://styles/lemonplug/ckenng4qa0bsl1anzmux3hh43"
	  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
	  onDblClick={addMarkerPopUp}
	>
	{
	travelEntries.map(entry =>(
	 <>
	<Marker
		key={entry._id}
		latitude={entry.latitude} 
		longitude={entry.longitude}
		>
	<div onClick={()=> setShowPopUp({

				...showPopUp,
				[entry._id] : true

		})}>	
	<svg 
	className="marker"
	width="30"
	height="30"
	viewBox="0 0 24 24">
	<path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657  0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
	</svg>
	</div>		
    </Marker>
		
	 { showPopUp[entry._id] ? <Popup
		  latitude={entry.latitude} 
		  longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
		  dynamicPosition={true}
          onClose={() => setShowPopUp({})}
          anchor="top" >
          <div className="popup">
			<h3>{entry.title}</h3>
			<p>{entry.comments}</p>
			<small>Visited on: {new Date(entry.visitedDate).toLocaleDateString()}</small>
		  </div>
	</Popup> : null }
		
	</>	
	 ))
	}
		  
	{	  
	  EntryLocation ? (
		<>
		  	<Popup
		  latitude={EntryLocation.latitude} 
		  longitude={EntryLocation.longitude}
          closeButton={true}
          closeOnClick={false}
		  dynamicPosition={true}
          onClose={() => setEntryLocation(null)}
          anchor="top" >
          <div className="popup">
			<h3>Add New Travel Log</h3>
			<p>{entry.comments}</p>
			<small>Visited on: {new Date(entry.visitedDate).toLocaleDateString()}</small>
		  </div>
			</Popup>
		</>
		  ): null
			  
	}	  
	  
    </ReactMapGL>
	 
  );
};

export default App;