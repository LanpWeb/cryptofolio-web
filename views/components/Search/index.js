// @flow

import React, { useState, useCallback } from "react";
import Autosuggest from "react-autosuggest";
import Link from "next/link";

import { connect } from "react-redux";

import { getMapCrypto } from "ducks/mapCrypto/actions";

import type { Props } from "./types";

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : data.filter(
        lang =>
          lang.name.toLowerCase().slice(0, inputLength) === inputValue ||
          lang.symbol.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = () => "";
const renderSuggestion = suggestion => (
  <Link href="/coin/[slug]" as={`/coin/${suggestion.slug}`}>
    <a>
      <img
        src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${suggestion.id}.png`}
        alt="logo"
        width="16"
        height="16"
      />
      {`${suggestion.name} (${suggestion.symbol})`}
    </a>
  </Link>
);
const renderInputComponent = inputProps => (
  <div>
    <input {...inputProps} />
  </div>
);

const Search = ({
  data,
  progress,
  // error,
  loaded,
  getMapCrypto
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

  const onSuggestionsFetchRequested = useCallback(
    ({ value }: any) => {
      if (progress) return;
      setSuggestions(getSuggestions(value, data));
    },
    [progress, data]
  );
  const onSuggestionsClearRequested = useCallback(() => setSuggestions([]), []);

  const inputProps = {
    placeholder: "Search",
    value,
    onChange,
    onClick
  };

  return (
    <Autosuggest
      suggestions={suggestions.slice(0, 10)}
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
  ({ mapCrypto: { data, progress, error, loaded } }) => ({
    data,
    progress,
    error,
    loaded
  }),
  dispatch => ({
    getMapCrypto: () => dispatch(getMapCrypto())
  })
)(Search);
