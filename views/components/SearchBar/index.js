// @flow

import React, { useCallback, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
import Link from 'next/link'
import { connect } from 'react-redux'
import { getMapCrypto } from 'ducks/mapCrypto/actions'
import { Search } from 'components/icons/Search'
import { Close } from 'components/icons/Close'
import type { Props } from './types'

const SearchBar = ({
  data,
  progress,
  loaded,
  getMapCrypto,
  shape,
  selectable = false,
}: Props) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [logoId, setLogoId] = useState(null)

  const getSuggestions = (value, data) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : data.filter(
          (lang) =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue ||
            lang.symbol.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  const addCoin = useCallback(() => setValue('sdjhsdj'), [setValue])
  const getSuggestionValue = (suggestion) =>
    selectable ? `${suggestion.name} (${suggestion.symbol})` : ''

  const renderSuggestion = (suggestion) =>
    selectable ? (
      <span
        className="aic p3 fw-medium search__link"
        onClick={() => setLogoId(suggestion.id)}
      >
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${suggestion.id}.png`}
          alt="logo"
          className="search__img"
        />
        {`${suggestion.name} (${suggestion.symbol})`}
      </span>
    ) : (
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
    )

  const renderInputComponent = (inputProps) => {
    const searchBarClassName = classNames({
      search__input: true,
      search__input_bordered: inputProps.shape === 'bordered',
      ' search__input_logo-search': inputProps.logoId && inputProps.value,
    })

    return (
      <div className="search__inner">
        <input {...inputProps} className={searchBarClassName} />
        {inputProps.logoId && inputProps.value ? (
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${inputProps.logoId}.png`}
            alt="logo"
            className="search__coin-logo"
          />
        ) : null}
        {inputProps.value.length > 0 ? (
          <button
            className="pure-btn search__btn"
            onClick={inputProps.deleteValue}
          >
            <Close />
          </button>
        ) : (
          <button className="pure-btn search__btn">
            <Search />
          </button>
        )}
      </div>
    )
  }

  const onChange = useCallback(
    (event: any, { newValue }: any) => {
      setValue(newValue)
      // eslint-disable-next-line no-unused-expressions
      !newValue && setLogoId(null)
    },
    [setValue, setLogoId]
  )

  const onClick = useCallback(() => !loaded && getMapCrypto(), [
    loaded,
    getMapCrypto,
  ])

  const deleteValue = useCallback(() => {
    setValue('')
    setLogoId(null)
  }, [setValue, setLogoId])

  const onSuggestionsFetchRequested = useCallback(
    ({ value }: any) => {
      if (progress) return
      setSuggestions(getSuggestions(value, data))
    },
    [progress, data]
  )

  const onSuggestionsClearRequested = useCallback(() => setSuggestions([]), [])
  const inputProps = {
    placeholder: 'Search...',
    value,
    onChange,
    onClick,
    deleteValue,
    shape,
    addCoin,
    logoId,
  }
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
  )
}

export default connect(
  ({ mapCrypto: { data, progress, error, loaded } }) => ({
    data,
    progress,
    error,
    loaded,
  }),
  (dispatch) => ({
    getMapCrypto: () => dispatch(getMapCrypto()),
  })
)(SearchBar)
