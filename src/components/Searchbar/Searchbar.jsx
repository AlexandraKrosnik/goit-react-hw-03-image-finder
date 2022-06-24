import {
  Header,
  SearchForm,
  Button,
  SearchLabel,
  SearchInput,
  Svg,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import { Component } from 'react';

const SearchSvg = styled(AiOutlineSearch)`
  ${Svg}
`;

export class Searchbar extends Component {
  state = {
    value: '',
  };

  changeValue = ({ target }) => {
    const query = target.value;
    if (query === this.state.value || query === ' ') {
      return;
    }

    this.setState({
      value: query,
    });
  };

  submitForm = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    const value = e.target.query.value.trim();
    onSubmit(value);
  };

  render() {
    const { value } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.submitForm}>
          <Button type="submit">
            <SearchSvg />
            <SearchLabel>Search</SearchLabel>
          </Button>
          <SearchInput
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeValue}
            value={value}
          />
        </SearchForm>
      </Header>
    );
  }
}
