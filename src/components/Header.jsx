import { Sticker as Sticky, Plus, List } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  const[query,setQuery]=useState('')
  const handleSubmit=(e)=>{
e.preventDefault();
  }
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-yellow-600 font-bold text-xl">
            <Sticky size={24} />
            <span>Sticky Notes</span>
          </Link>
        
          <div className="flex gap-4">
            <Link 
              to="/" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                pathname === '/' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Plus size={18} />
              <span>Create</span>
            </Link>
          
            
            <Link 
              to="/notes" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                pathname === '/notes' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <List size={18} />
              <span>View All</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;