import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const Search = ({onSearch}) => {
    const [query, setQuery] = useState("");

    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearchSubmit = () => {
        onSearch(query)
    }

  return (
    <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="pr-8 pl-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-black"
      onChange={handleSearchChange}
    />
    <button onClick={handleSearchSubmit}>
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
    </button>
  </div>
  )
}

export default Search