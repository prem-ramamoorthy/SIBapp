import React, { useState } from 'react';
import options from '../data/Members/VerticalsOption.json';
import { Search, RefreshCw } from 'lucide-react';
import members from '../data/Members/MembersDetails.json';
import MemberCard from './MemberCard';

function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('');

  const clearAllFilters = () => {
    setSearchTerm('');
    setVerticalFilter('');
  };

  // Dropdown option components
  const OptionComponent = options.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  // Filter members by name and vertical
  const filteredMembers = members.filter((member) => {
    const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const verticalMatch = verticalFilter ? member.mainVertical === verticalFilter : true;
    return nameMatch && verticalMatch;
  });

  // Member cards for filtered members
  const MemberComponent = filteredMembers.map((member, index) => (
    <MemberCard key={index} member={member} />
  ));

  return (
    <div className="container">
      <section className="controls-section">
        <div className="search-filters">
          <div className="search-container">
            <div className="search-box">
              <Search style={{ position: 'absolute', left: '10px', color: 'rgba(123, 86, 46, 1)' }} />
              <input
                type="text"
                id="searchInput"
                placeholder="Search members by name..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="clear-search"
                id="clearSearch"
                title="Clear search"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="filter-container">
            <select
              id="verticalFilter"
              className="vertical-dropdown"
              value={verticalFilter}
              onChange={(e) => setVerticalFilter(e.target.value)}
            >
              <option value="">All Verticals</option>
              {OptionComponent}
            </select>
          </div>

          <button className="btn btn--secondary clear-filters" id="clearFilters" onClick={clearAllFilters}>
            <RefreshCw />
            Clear Filters
          </button>
        </div>

        <div className="results-info">
          <span id="resultsCounter">
            Showing {filteredMembers.length} of {members.length} members
          </span>
        </div>
      </section>

      <section className="members-section">
        <div className="members-grid" id="membersGrid">
          {filteredMembers.length ? (
            MemberComponent
          ) : (
            <div className="empty-state" id="emptyState">
              <div className="empty-content">
                <i className="fas fa-users empty-icon"></i>
                <h3>No members found</h3>
                <p>Try adjusting your search terms or filters</p>
                <button className="btn btn--primary" onClick={clearAllFilters}>
                  View All Members
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Main;