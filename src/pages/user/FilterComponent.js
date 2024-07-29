import React from 'react';
import { FiFilter } from 'react-icons/fi'; // Filter icon from React Icons

const FilterComponent = () => {
  const brands = ['Adidas', 'Puma', 'Nike', 'New Balance', 'Converse', 'Vans', 'Tommy Hilfiger'];
  const priceRanges = [
    'Rs. 599 to Rs. 999',
    'Rs. 999 to Rs. 1599',
    'Rs. 1599 to Rs. 1999',
    'Rs. 1999 to Rs. 2599',
    'Rs. 2599 to Rs. 2999',
    'Rs. 2999 to Rs. 3999'
  ];
  const colors = ['Black', 'Blue', 'Tan', 'Navy Blue', 'Red', 'Green', 'White'];

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4">

      <div className="mb-4">
        <h3 className="font-medium mb-2">BRAND</h3>
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center mb-1">
            <input type="checkbox" id={`brand-${index}`} className="mr-2" />
            <label htmlFor={`brand-${index}`}>{brand}</label>
          </div>
        ))}
        <button className="text-blue-500 text-sm mt-1">more</button>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">PRICE</h3>
        {priceRanges.map((range, index) => (
          <div key={index} className="flex items-center mb-1">
            <input type="checkbox" id={`price-${index}`} className="mr-2" />
            <label htmlFor={`price-${index}`}>{range}</label>
          </div>
        ))}
      </div>

      <div className=''>
        <h3 className="font-medium mb-2">COLOR</h3>
        {colors.map((color, index) => (
          <div key={index} className="flex items-center mb-1">
            <input type="checkbox" id={`color-${index}`} className="mr-2" />
            <label htmlFor={`color-${index}`} className="flex items-center">
              <span 
                className={`w-4 h-4 rounded-full mr-2 ${
                  color.toLowerCase() === 'white' ? 'border border-gray-300' : ''
                }`} 
                style={{ backgroundColor: color.toLowerCase() }}
              ></span>
              {color}
            </label>
          </div>
        ))}
        <button className="text-blue-500 text-sm mt-1">more</button>
      </div>
    </div>
  );
};

export default FilterComponent;
