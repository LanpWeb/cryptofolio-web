// @flow

import React, { useState, useCallback } from "react";
import Autosuggest from "react-autosuggest";
import classNames from "classnames";
import Link from "next/link";
import { connect } from "react-redux";
import { getMapCrypto } from "ducks/mapCrypto/actions";
import { Search } from "components/icons/Search";
import { Close } from "components/icons/Close";
import type { Props } from "./types";

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data.filter(
      lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
          || lang.symbol.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = () => "";
const renderSuggestion = suggestion => (
  <Link href="/coin/[slug]" as={`/coin/${suggestion.slug}`}>
    <span className="aic p3 fw-medium search__link">
      <img
        src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${suggestion.id}.png`}
        alt="logo"
        className="search__img"
      />
      {`${suggestion.name} (${suggestion.symbol})`}
    </span>
  </Link>
);
const renderInputComponent = inputProps => {
  const searchBarClassName = classNames(
    {
      search__input: true,
      search__input_bordered: inputProps.shape === "bordered",
    },

  );
  return (
    <div className="search__inner">
      <input {...inputProps} className={searchBarClassName} />
      {inputProps.value.length > 0
        ? (
          <button
            className="pure-btn search__btn"
            onClick={inputProps.deleteValue}
          >
            <Close />
          </button>
        ) : (
          <button
            className="pure-btn search__btn"
          >
            <Search />
          </button>
        )}
    </div>
  );
};

const SearchBar = ({
  data,
  progress,
  loaded,
  getMapCrypto,
  shape

}: Props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const onChange = useCallback(
    (event: any, { newValue }: any) => setValue(newValue),
    []
  );
  const onClick = useCallback(() => !loaded && getMapCrypto(), [
    loaded,
    getMapCrypto
  ]);
  const deleteValue = useCallback(() => setValue(""),
    []);
  const onSuggestionsFetchRequested = useCallback(
    ({ value }: any) => {
      if (progress) return;
      setSuggestions(getSuggestions(value, data));
    },
    [progress, data]
  );
  const onSuggestionsClearRequested = useCallback(() => setSuggestions([]), []);
  const inputProps = {
    placeholder: "Search...",
    value,
    onChange,
    onClick,
    deleteValue,
    shape
  };

  return (
    <Autosuggest
      suggestions={suggestions.slice(0, 6)}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
    />
  );
};

export default connect(
  ({
    mapCrypto: {
      data, progress, error, loaded
    }
  }) => ({
    data,
    progress,
    error,
    loaded
  }),
  dispatch => ({
    getMapCrypto: () => dispatch(getMapCrypto())
  })
)(SearchBar);
