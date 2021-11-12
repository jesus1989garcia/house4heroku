import React from 'react'
import PlacesAutoComplete, { geocodeByAddress } from 'react-places-autocomplete'

function SearchBox(props) {
  
  const [address, setAddress ] = React.useState('')

  const handleSelect = async (value) => {
    const result = await  geocodeByAddress(value)

    setAddress(value)
    console.log(result[0].address_components[0].long_name)  //restrict to address by street and then save the 1st index of city
    props.onChange(result[0].address_components[0].long_name)
  }

  return(
    <div>
      <PlacesAutoComplete  value={address} name='address'  onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => 
          <div>
            <input {...getInputProps({placeholder:'type a city'})} />
            <div>
              {loading ? <div>loading results</div> : null}
              {suggestions.map(suggestion => {
                const style = { backgroundColor: suggestion.active ? 'green' : null}
                return <div {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
              })}
            </div>
          </div>
         }
         
        </PlacesAutoComplete>
    </div>
  )
}

export default SearchBox