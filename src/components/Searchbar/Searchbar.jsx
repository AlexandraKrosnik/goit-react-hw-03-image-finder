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

  render() {
    const { value } = this.state;
    const { onSubmit } = this.props;
    return (
      <Header>
        <SearchForm onSubmit={onSubmit}>
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
