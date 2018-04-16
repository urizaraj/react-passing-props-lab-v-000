import FruitBasket from './FruitBasket';

import React, { Component } from 'react';
import { runInThisContext } from 'vm';

class App extends Component {
  constructor() {
    super()

    this.state = {
      filters: [],
      currentFilter: null,
      fruit: []
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  render() {
    const props = {
      filters: this.state.filters,
      handleFilterChange: this.handleFilterChange,
      currentFilter: this.state.currentFilter,
      fruit: this.state.fruit
    }

    return (
      <div>
        <FruitBasket {...props} />
      </div>
    )
  }

  handleFilterChange(event) {
    this.setState({ currentFilter: event.target.value });
  }

  fetchFilters() {
    fetch('/api/fruit_types')
      .then(response => response.json())
      .then(filters => this.setState({ filters }));
  }

  componentWillMount() {
    this.fetchFilters()
  }

  componentDidMount() {
    fetch('/api/fruit')
      .then(response => response.json())
      .then(fruit => this.setState({ fruit }))
  }
}

export default App;
